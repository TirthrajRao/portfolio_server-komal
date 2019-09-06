// Database model
const ContactModel = require("../models/contact");
const emailService = require('./sendEmail');

module.exports = {
    createContact: (data) => {
        return new Promise((resolve, reject) => {
            const newContact = new ContactModel(data);
            newContact.save((err, savedContact) => {
                if (err) {
                    reject(err);
                } else {

                    let template = `<!DOCTYPE html>
                <html>
                <head>
                    <title>Contact Us</title>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
                </head>
                <body style="background-color: #F9F9F9;  font-family: sans-serif;">
                    
                    <div style="width: 500px; height: 450px; margin: auto; background-color: white; top: 100px; position: fixed;left: 0;
                    right: 0;box-shadow: 0px 0px 20px lightgray">
                    <img src="https://raoinformationtechnology.com/theme/images/raoinfotech-logo.png" height="40px" width="90px" style="position: fixed;left: 0px;right: 0px; margin: auto;top: 35px;">
                
                    <div style="background-image: url(https://raoinformationtechnology.com/theme/images/breadcrumb/bg-img.png); background-repeat: no-repeat;background-size: cover;background-color: #3998c51c; padding: 15px 0px">
                        <h2 style="margin: 0px;color: #181123;font-family: monospace;font-size: 30px;text-align: center">Hello, Rao Infotech</h2>
                        <p style="color: #181123; text-align: center;">You have one new message!</p>
                    </div>
                    <table style="border: none; margin: auto;">
                        <tr>
                            <td style="padding: 10px; color:#3998c5"><i class="far fa-user" style="margin-right: 20px;color: #181123"></i>Name:</td>
                            <td style="color: #72618d">`+ savedContact.name + `</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; color:#3998c5"><i class="far fa-envelope" style="margin-right: 20px;color: #181123"></i>Email ID:</td>
                            <td style="color: #72618d">`+ savedContact.email + `</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; color:#3998c5"><i class="far fa-building" style="margin-right: 20px;color: #181123"></i>Company Name:</td>
                            <td style="color: #72618d">`+ savedContact.companyName + `</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; color:#3998c5"><i class="fas fa-mobile-alt" style="margin-right: 23px;color: #181123"></i>Company No:</td>
                            <td style="color: #72618d">`+ savedContact.companyNumber + `</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; color:#3998c5"><i class="fas fa-tools" style="margin-right: 20px;color: #181123"></i>Subject :</td>
                            <td style="color: #72618d">`+ savedContact.message + `</td>
                        </tr>
                    </table></div></body></html>`;
                    emailService.seneWelcomeEmail('mehul.2287884@gmail.com', template);
                    resolve(savedContact);
                }
            });
        });
    },
    getAllContactRequest:()=>{
        return new Promise((resolve, reject) => {
            ContactModel.find({},function(err,contacts){
                if (err) {
                    reject(err);
                } else {
                    console.log("data==========>",contacts);
                    resolve(contacts)
                }
            })
        })
    }
}
