/* Put at root folder, easier to execute.
    Can be execute at terminal using --> node server.js (remember to navigate to correct folder path)
    Can be terminate using -> ctrl^c
    restart server after there is a change with the code
*/
const http = require('http');
const app = require('./backend/app');

const normalizePort = val => {  // server port
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// Check which type of error occurs
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);          // inform express which port currently working on

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);    //log we are listenting the address
server.listen(port);

// installed nodemon to avoid constantly restarting server