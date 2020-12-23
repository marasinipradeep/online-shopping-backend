 const {forwardTo} =require('prisma-binding');
 const {hasPermission} =require('../utils')
 
 const Query = {

   items:forwardTo('db'),
   item:forwardTo('db'),
   itemsConnection:forwardTo('db'),
   me(parent,args,ctx,info){
     //check if there is a current user id
     if(!ctx.request.userId){
       return null;
     }
     return ctx.db.query.user({
       where:{id:ctx.request.userId},
     },info);
   },

   async users(parent, args, ctx, info){

    //1. Check if they are logged in

    console.log(`Inside User permission`)
    console.log(ctx.request.user)

    if(!ctx.request.userId){
      throw new Error('You must be logged in');
    }

    //2. Check if the user has the permissions to query all the users
    hasPermission(ctx.request.user,['ADMIN','PERMISSIONUPDATE']);

    //3. If they do, query all the user!
    return ctx.db.query.users({},info)
   },
   // if anything added to schema had to resolve in resolver
};

module.exports = Query;
