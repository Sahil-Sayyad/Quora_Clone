//import all required packages
const User = require('../models/user');
module.exports.profile = async (req,res)=>{

    return res.render('users_profile', {
        title : "Quora"
    });
}

//render sign-in page 
module.exports.signIn = async (req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_in' ,{
        title:"Quora"
    });
}
//render sign-up in one page 
module.exports.signUp = async (req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_up' ,{
        title:"Quora"
    });
}

//get the sign up data 
module.exports.create = async (req, res)=>{
    try{
        if(req.body.password != req.body.confirm_password){
            console.log('password doest not match');
            return res.redirect('back');
        }
        console.log(req.body);
        //check if already signed
        const user = await User.findOne({email:req.body.email});
        //if not then create user 
        if(!user){
            await User.create(req.body);
            console.log('user created success')
            return res.redirect('/users/sign-in');
        }else{
            console.log('user already exist');
            return res.redirect('/users/sign-in');
        }

    }catch(err){
        console.log('error in create user controller ', err);
        return;
    }

}

//sign in and create session for the user 
module.exports.createSession = async(req, res)=>{
    console.log("users session created succesfuly");
    return res.redirect('/');
}

//sign out and destory session of the user
module.exports.destroySession = function(req, res){
        req.logout((err)=>{
            if(err){
                return done(err);
            }
        });
        console.log('user sign out succefully');
        return res.redirect('/');
} 