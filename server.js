const http = require("http");
const fs = require("fs");
const path = require("path");
const root = __dirname;
const types = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".json":"application/json"};
http.createServer((req,res)=>{
  let pathname = decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  if(pathname === "/") pathname = "/index.html";
  const file = path.join(root, pathname);
  if(!file.startsWith(root)){res.writeHead(403);return res.end("Forbidden");}
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(404,{"Content-Type":"text/plain"});return res.end("Not found");}
    res.writeHead(200,{"Content-Type":types[path.extname(file)]||"application/octet-stream"});
    res.end(data);
  });
}).listen(5173,()=>console.log("AutoConnect running at http://localhost:5173"));
