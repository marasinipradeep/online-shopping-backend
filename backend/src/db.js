
//This file connects to the remote prisma DB and gives us the ability to query it with JS
const {Prisma} =require('prisma-binding');
const db = new Prisma({
    typeDefs:'src/generated/prisma.graphql',
    endpoint:"https://us1.prisma.sh/pradeep-marasini/e-store/dev",//process.env.PRISMA_ENDPOINT,
    secret:process.env.PRISMA_SECRET,
    debug:true
})

module.exports = db;