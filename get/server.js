const http = require("http")
const url = require("url")

function start(route, handle) {
  function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname

    route(handle, pathname, res)
  }

  http.createServer(onRequest).listen(8888)
}

exports.start = start
