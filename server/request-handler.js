/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/


  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  // The outgoing status.
  // See the note below about CORS headers.
  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
  // storage elements are objects with the following keys:
    // .roomname, .username, .text, .objectId



var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var storage = {};

// storage['/'] = {results: [initMsg]};



var requestHandler = function(request, response) {

  var statusCode = 200;

  var headers = defaultCorsHeaders;

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (request.method === 'GET') {
    headers['Content-Type'] = 'text/json';
    response.writeHead(statusCode, headers);
    var item = JSON.stringify(storage[request.url]);
    response.end(item);

  } else if (request.method === 'POST') {
    request.on('data', (chunk) => {
      if (!storage[request.url]) {
        var item = JSON.parse(chunk.toString());
        storage[request.url] = {};
        storage[request.url].results = [];
        storage[request.url].results.push(item);
      } else {
        var item = JSON.parse(chunk.toString());
        storage[request.url].results.push(item);
      
      }
    });
    // var obj = storage[request.url].results ? storage[request.url].results.push(body) : body;
    response.writeHead(statusCode, headers);
    response.end('got it!');
  }


};


exports.requestHandler = requestHandler;




/*
I - request
  - GET
  - POST
O - GET
  -- return JSON object which is an array of message objects
  - POST
  -- take the message data from the request object and push it into our array
C - none
E - none

var message = {
  username: app.username,
  text: app.$message.val(),
  roomname: app.roomname || 'lobby'
};



// check the AJAX method (request.method)
  // if request.method === 'GET'
    -- send back our data
     else if request.method === 'POST'
    -- add data to storage
obj = {first: 'Jon', last}
{name: 'Jon', name: obj}

*/











