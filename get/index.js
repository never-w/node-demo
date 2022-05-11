const server = require("./server")
const router = require("./router")
const requestHandlers = require("./requestHandlers.js")

const handle = {
  ["/"]: requestHandlers.start,
  ["/start"]: requestHandlers.start,
  ["/upload"]: requestHandlers.upload,
}

server.start(router.route, handle)
