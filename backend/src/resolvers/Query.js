 const Query = {
    async  items(parent,args,ctx,info){
        const items = await ctx.db.query.item();
        return items;
   }
};

module.exports = Query;
