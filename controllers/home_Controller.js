//import required packages 
module.exports.home = async (req,res)=>{
    return res.render('home' , {
        title:"Quora"
    });
}