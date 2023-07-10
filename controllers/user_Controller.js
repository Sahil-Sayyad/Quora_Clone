//import all required packages
module.exports.profile = async (req,res)=>{

    return res.render('users_profile', {
        title : "Quora"
    });
}