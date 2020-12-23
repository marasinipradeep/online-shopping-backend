// let's go!



require('dotenv').config({path:'variables.env'});

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

//use express middleware to handle cookies(JWT)
server.express.use(cookieParser());

//decode the JWT so we can get the user Id on each request
server.express.use((req,res,next)=>{
    const {token} =req.cookies;
    console.log(`the token is ${token}`)
    if(token){
        const {userId}=jwt.verify(token,process.env.APP_SECRET);
        //put the userId onto the req for future resquests to access
        req.userId = userId;
    }
    next();
});

//ToDO use express middleware to populate current user

//2. Create a middleware that populates the user on each request
server.express.use(async(req,res,next)=>{
    //if they aren't logged in skip this
    if(!req.userId) return next();
    const user = await db.query.user(
        {where:{id:req.userId}},
        '{id,permissions,email,name}'
        );
        req.user = user;
        next();
});

server.start({
    cors:{
        credentials:true,
        origin:process.env.FRONTEND_URL || "http://localhost:8080"
    },
},deets=>{
    console.log(`server is running on port http://localhost:${deets.port}`)
});