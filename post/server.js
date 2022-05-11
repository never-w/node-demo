const http = require("http")
const url = require("url")

function start(route, handle) {
  function onRequest(req, res) {
    const pathname = url.parse(req.url).pathname
    route(handle, pathname, res, req)
  }

  http.createServer(onRequest).listen(8888)
}

exports.start = start
