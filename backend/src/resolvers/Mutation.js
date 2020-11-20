const Mutations = {

    async createItem(parent,args,ctx,info){
        //ToDo check if they logged in
        const item =await ctx.db.mutation.createItem({
            data:{
                ...args
            }
        },info);
       
        return item;
    },
    updateItem(parent,args,ctx,info){

        console.log("Inside updateItem")
        //first make a copy of the updates
        const updates = {...args};
        //remove the ID from the updates
        delete updates.id
        //run the update method
        return ctx.db.mutation.updateItem({
            data:updates,
            where:{
                id:args.id,
            },
        },info
        );
    }
};

module.exports = Mutations;
