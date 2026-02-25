const password = "supersecretpassword12345";
const express = require("express");
const app = express();
const port = process.argv[2] || 80;
var system = require("child_process");
const { file } = require("./file.js");

let config = {};

file.read(
  "config.json",
  (data) => {
    config = JSON.parse(data);
  },
  () => {
    config = {};
  }
);

async function createNew(id){
    let p = new Promise((res,rej)=>{
        let sh = system.spawn('/bin/bash',['-e','createNewWebsite.sh',config[id].domain,config[id].password]);
        sh.on('exit',code=>{
            res();
        });
	sh.on('data',data=>{
		console.log(data.toString());
	});
    });
    await p;
}

app.post("/:id/:domain/:password", async (req, res) => {
  console.log(req.params);
  if (req.headers.authorization == password) {
    let id = req.params.id;
    if (id in config) {
      config[id] = {
        domain: req.params.domain,
        password: req.params.password,
      };
    } else {
      config[id] = {
        domain: req.params.domain,
        password: req.params.password,
      };
      file.save('config.json',JSON.stringify(config));
      await createNew(id);
    }
    file.save('config.json',JSON.stringify(config));
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
app.delete("/:id", async (req, res) => {
  if (req.headers.authorization == password && req.params.id in config) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
app.get("/", async (req, res) => {
  res.json({ success: true });
});

app.use((err, _req, res, next) => {
  if (err instanceof URIError) {
    res.status(400).json({ success: false, error: 'Invalid URL encoding' });
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
