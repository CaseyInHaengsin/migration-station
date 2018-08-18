const express           = require('express');
const router            = new express.Router();
const User              = require('../models/User');
const mongoose          = require('mongoose');
const config            = require('../../config');
const nodemailer        = require('nodemailer')
const db_url            = process.env.MONGODB_URI || config.dbUri
const userController    = require("../controllers/usersController")
const appointmentController    = require("../controllers/appointmentsController")

// mongoose.connect(db_url);



    ///////// SEND AN EMAIL API ROUTE ////////////
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
                    from: `"${req.body.name}" <${req.body.email}>`, // sender address
                    to: 'alexwalz@icloud.com',
                    bcc : ['alexwalz@icloud.com'], // list of receivers
                    subject: 'A New Message from Marina Cove Website!', // Subject line
                    html: `
                            <p>Hello! ${req.body.name} has sent you a message from the Marina Cove Website!
                             Below is the information that was sent to you:</p><br/><br/>
                            
                            <h3>Name: ${req.body.name} </h3>
                            <h3>Phone Number: ${req.body.phone}</h3>
                            <h3>Email: ${req.body.email}</h3>
                            <h3>Subject ${req.body.subject}</h3>
                            
                            <br/>
                            <br/>
                            
                            <p> ${req.body.message}</p>
                            
                            <br/><br/>` 
                            
                            
                            
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
    //////////////////////////////////////////////


    

    //////////    USER API ROUTES ///////////////
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
    ////////////////////////////////////////////



    //////// APPOINTMENTS API ROUTES ///////////
    router.route('/appointments')
    .post(function (req, res) {
        appointmentController.create(req, res);
    })
    .get(function (req, res) {
        appointmentController.findAll(req, res);
    })
    .put(function (req, res) {
        appointmentController.update(req, res);
    })
    .delete(function (req, res) {
        appointmentController.remove(req, res);
    });
    ////////////////////////////////////////////




module.exports = router;





