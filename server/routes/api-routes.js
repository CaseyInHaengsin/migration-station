const express           = require('express');
const router            = new express.Router();
const User              = require('../models/User');
const mongoose          = require('mongoose');
const config            = require('../../config');
const nodemailer        = require('nodemailer')
const db_url            = process.env.MONGODB_URI || config.dbUri
const userController    = require("../controllers/usersController")

// mongoose.connect(db_url);




router.route('/send-message')
    .post(function (req, res) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing

        console.log(req.body)
        console.log("sending email")

        try {
            nodemailer.createTestAccount((err, account) => {
                // create reusable transporter object using the default SMTP transport
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.EMAIL_USER || '@gmail.com',
                        pass: process.env.EMAIL_PASS || 'testing123!'
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: `"${req.body.firstName} ${req.body.lastName}" <${req.body.email}>`, // sender address
                    to: `${req.body.email}`,
                    bcc : ['alexwalz@icloud.com'], // list of receivers
                    subject: 'BoingleBox Storage Quote', // Subject line
                    html: `
                            <p>Hello, ${req.body.firstName}!  You recently requested a quote from Boinglebox.com for our portable
                            storage containers!  Below is the information that was quoted to you:</p><br/><br/>
                            
                            <h3>Name: ${req.body.firstName} ${req.body.lastName}</h3>
                            <h3>Phone Number: ${req.body.phoneNumber}</h3>
                            <h3>Email: ${req.body.firstName}</h3>
                            <h3>zip Code ${req.body.zipCode}</h3>
                            
                            <br/>
                            <br/>
                            
                            <h3>Miles From Store: ${req.body.miles}</h3>
                            <h3>Container Size: ${req.body.size} Foot Container</h3>
                            
                            <br/><br/>
                            
                            <p>If you have any questions about the quote you have recieved, please call our store at 1-844-BOINGLE</p>
                            <br/>
                            <p>Thanks!</p>
                            <p>The Boingle Team.</p>` 
                            
                            
                            
                            // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.status(500).json({
                            message: error
                        });
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                });
            });
            res.status(200).json({
                message: "Message sent successfully"
            });
        }
        catch (e) {
            res.status(500).json({
                message: e
            });
        }
    });

    router.route('/user')
    .post(function (req, res) {
        userController.create(req, res);
    })
    .get(function (req, res) {
        userController.findAll(req, res);
    })
    .put(function (req, res) {
        userController.update(req, res);
    })
    .delete(function (req, res) {
        userController.remove(req, res);
    });

module.exports = router;





