const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken')
const Mutations = {

    async createItem(parent,args,ctx,info){
        //ToDo check if they logged in
        console.log("inside createItem")
        console.log(args)
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
    },

   async deleteItem (parent,args,ctx,info){
        console.log("inside deleteItem")
        console.log(args.id)

        const where = {id:args.id}
        //1.find the item

        const item = await ctx.db.query.item({where},`{id title}`)
        //2. check if they own that item,or have the permissions
        //3. Delete it
        return ctx.db.mutation.deleteItem({where},info);
    },

    async signup(parent, args, ctx, info){
        //lowercase the email
        args.email = args.email.toLowerCase();
        //hash their password
        const password = await bcrypt.hash(args.password,10);
        //create the user in the database
        const user = await ctx.db.mutation.createUser(
            {
            // data:{
            //     name:args.name,
            //     email:args.email,
            //     password:args.password
            // }

            //or
            data:{
                ...args,
                password,
                permissions:{set:['USER']},
            },
        
        },
        info
        );

        //Create teh JWT token for them
        
        const token = jwt.sign({userId:user.id},process.env.APP_SECRET);
        //We set the jwt as a cookie on the response
        ctx.response.cookie('token',token,{
            httpOnly:true,
            maxAge:1000 * 60 * 60 * 24 * 365, //1 year cokkie (how long you want cokkie to last)
        });
        //Finally we return the user to the browser
        return user;
    },

    async signin(parent,{email,password},ctx,info){
        //1.check if there is a user with that email
        const user = await ctx.db.query.user({where:{email}});
        if(!user){
            throw new Error(`No such user found for email${email}`);
        }
        //2.check if their password is correct 
        const valid = await bcrypt.compare(password,user.password)
        if(!valid){
            throw new Error ('Invalid password');
        }
        //3.generate the JWT token
        const token =jwt.sign({userId:user.id},process.env.APP_SECRET)
        //4.set the cokkie with the token

        ctx.response.cookie('token',token,{
            httpOnly:true,
            maxAge:1000 * 60 * 60 * 24 * 365, //1 year cokkie (how long you want cokkie to last)
        });
        //5.Return the user
        return user;

    }
};

module.exports = Mutations;
