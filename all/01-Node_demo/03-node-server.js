let http=require("http");
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    response.end("<dev>你好，帅气书涛</dev>");
}).listen(3333);