// let's go!

require('dotenv').config({path:'variable.env'});

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

//ToDo use express middleware to handle cookies(JWT)
//ToDO use express middleware to populate current user

server.start({
    cors:{
        credentials:true,
        origin:process.env.FRONTEND_URL
    },
},deets=>{
    console.log(`server is running on port http://localhost:${deets.port}`)
});