const Mutations = {

    async createItem(parent,args,ctx,info){
        //ToDo check if they logged in
        console.log("inside  create item Mutation")
        const item =await ctx.db.mutation.createItem({
            data:{
                ...args
            }
        },info);
        console.log("before return create item")
        console.log(item)
        return item;
    }
};

module.exports = Mutations;
