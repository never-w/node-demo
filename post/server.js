const http = require("http")
const url = require("url")

function start(route, handle) {
  function onRequest(req, res) {
    let postData = ""
    const pathname = url.parse(req.url).pathname
    req.setEncoding = "utf8"

    req.addListener("data", function (postDataChunk) {
      postData += postDataChunk
    })

    req.addListener("end", function () {
      route(handle, pathname, res, req)
    })
  }

  http.createServer(onRequest).listen(8888)
}

exports.start = start
