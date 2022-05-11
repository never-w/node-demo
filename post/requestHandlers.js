const querystring = require("querystring")
const fs = require("fs")
const formidable = require("formidable")

function start(res, req) {
  const body =
    "<html>" +
    "<head>" +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    "</head>" +
    "<body>" +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
    '<input type="file" name="upload">' +
    '<input type="submit" value="Upload file" />' +
    "</form>" +
    "</body>" +
    "</html>"

  res.writeHead(200, { "Content-Type": "text/html" })
  res.write(body)
  res.end()
}

function upload(res, req) {
  const form = formidable({})
  form.parse(req, (error, fields, files) => {
    fs.renameSync(files.upload.path, "/tmp/test.png")
    res.writeHead(200, { "Content-Type": "text/html" })
    res.write("received image:<br/>")
    res.write("<img src='/show' />")
    res.end()
  })
}

function show(res, req) {
  fs.readFile("/tmp/test.png", "binary", (error, file) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" })
      res.write(error + "\n")
      res.end()
    } else {
      res.writeHead(200, { "Content-Type": "image/png" })
      res.write(file, "binary")
      res.end()
    }
  })
}

exports.start = start
exports.upload = upload
exports.show = show
