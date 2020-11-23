// let's go!



require('dotenv').config({path:'variables.env'});

const cookieParser = require('cookie-parser');
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

//use express middleware to handle cookies(JWT)
server.express.use(cookieParser());

//ToDO use express middleware to populate current user

server.start({
    cors:{
        credentials:true,
        origin:process.env.FRONTEND_URL || "http://localhost:8080"
    },
},deets=>{
    console.log(`server is running on port http://localhost:${deets.port}`)
});