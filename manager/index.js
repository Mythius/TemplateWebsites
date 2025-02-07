const password = "qwerqwer";
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
        let sh = system.spawn('/bin/bash',['createNewWebsite.sh',config[id].domain,config[id].password]);
        sh.on('exit',code=>{
            res();
        })
    });
    await p;
}

app.post("/:id/:domain/:password", async (req, res) => {
  if (req.headers.authorization == password) {
    if (req.params.id in config) {
      config[req.params.id] = {
        domain: req.params.domain,
        password: req.params.password,
      };
    } else {
      config[req.params.id] = {
        domain: req.params.domain,
        password: req.params.password,
      };
      await createNew(req.params.id);
    }
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

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
