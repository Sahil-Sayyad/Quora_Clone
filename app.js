//import all required packages 
const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

//serving the static files 
app.use(express.static('./public'));
//set up the layout
app.use(expressLayouts);
//extract the css and js links to layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//set up the view engine 
app.set('view engine' , 'ejs');
app.set('views', './views');
//express routes handler
app.use('/', require('./routes')); 
//start the server
app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running server ${err}`);
    }
    console.log(`Server is running on ${port}`);
});