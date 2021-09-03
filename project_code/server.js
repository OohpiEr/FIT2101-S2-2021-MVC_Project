/* Put at root folder, easier to execute.
    Can be execute at terminal using --> node server.js (remember to navigate to correct folder path)
    Can be terminate using -> ctrl^c
    restart server after there is a change with the code
*/
const http = require('http');
const app = require('./backend/app');

const port = process.env.PORT || 3000;

app.set("port", port)       // inform express which port currently working on
const server = http.createServer(app);

server.listen(port);        // server port