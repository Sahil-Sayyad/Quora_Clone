//import all required packages
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


}

//sign in and create session for the user 
module.exports.createSession = async(req, res)=>{


}