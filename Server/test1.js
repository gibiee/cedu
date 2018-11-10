const http = require('http')
var count = 0;

http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type" : "text/html"
  })
  response.write("<h1>Hello World</h1>")
  response.write("<p>" + count + "</p>");
  response.end()
}). listen(52273, () => {
  console.log("Server Running at http://127.0.0.1:52273");
})
