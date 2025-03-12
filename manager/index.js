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
  if (decodeURI(req.headers.authorization) == password) {
    let id = decodeURI(req.params.id);
    if (id in config) {
      config[id] = {
        domain: decodeURI(req.params.domain),
        password: decodeURI(req.params.password),
      };
    } else {
      config[id] = {
        domain: decodeURI(req.params.domain),
        password: decodeURI(req.params.password),
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
  if (decodeURI(req.headers.authorization) == password && decodeURI(req.params.id) in config) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
app.get("/", async (req, res) => {
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
