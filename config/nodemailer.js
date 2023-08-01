// importing required packages 
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

        const transporter = nodemailer.createTransport({
            service:'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure:false,
            auth: {
                user: process.env.AUTH_USER_EMAIL,
                pass: process.env.AUTH_USER_PASSWORD,
            },
        });

        let renderTemplate = (data, relativePath)=>{
            let mailHTML;
            ejs.renderFile(
                path.join(__dirname, '../views/mailers', relativePath),
                data,
                function(err, template){
                    if(err){console.log(`error in rendering template${err}`);return}
                    mailHTML = template;
                }
                )
                return mailHTML;
            }
            module.exports = {
                transporter:transporter,
                renderTemplate:renderTemplate
            };
