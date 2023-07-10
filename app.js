//import all required packages 
const express = require('express');
const app = express();
const port = 8000;
//start the server
app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running server ${err}`);
    }
    console.log(`Server is running on ${port}`);
});