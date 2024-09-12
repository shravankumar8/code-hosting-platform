const express = require("express");
const app = express();
const PORT = 8000;
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxy();
const basePath =
  "https://vercel-clone-a.s3.ap-southeast-2.amazonaws.com/__outputs";
app.use((req, res) => {
  const hostname = req.hostname;
  const subDomain = hostname.split(".")[0];
  const resolvesTo = `${basePath}/${subDomain}`;
  proxy.web(req, res, { target: resolvesTo, changeOrigin: true });
});
proxy.on("proxyReq", (proxyReq, req, res) => {
  const url = req.url;
  if (url === "/") {
    return (proxyReq.path += "index.html");
  }
});

app.listen(PORT, () => {
  console.log("\x1b[42m", "server is listening on port 8000");
});
