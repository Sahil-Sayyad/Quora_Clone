//import all required packages
const User = require('../models/user');
module.exports.profile = async (req,res)=>{

    return res.render('users_profile', {
        title : "Quora"
    });
}

//render sign-in and sign-up in one page 
module.exports.signIn = async (req, res)=>{
    return res.render('sign_in_sign_up' ,{
        title:"Quora"
    });
}

//get the sign up data 
module.exports.create = async (req, res)=>{
    try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        console.log(req.body);
        //check if already signed
        const user = await User.findOne({email:req.body.email});
        //if not then create user 
        if(!user){
            await User.create(req.body);
            return res.redirect('/users/sign-in_sign-up');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('error in create user controller ', err);
        return;
    }

}

//sign in and create session for the user 
module.exports.createSession = async(req, res)=>{

    return res.redirect('/');
}