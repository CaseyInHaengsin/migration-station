const express = require('express');
const router = new express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const config = require('../../config');
const nodemailer = require('nodemailer')
const db_url = process.env.MONGODB_URI || config.dbUri

mongoose.connect(db_url);

// router.get('/', function (req, res) {
//     res.json({ message: 'API Initialized!' });
// });

// router.get('/test', function (req, res) {
//     res.status(200).json({
//         message: "You're authorized to see this secret message."
//     });
// });

// USER ROUTES
// router.route('/users')
//     .get(function (req, res) {
//         User.find(function (err, users) {
//             if (err)
//                 res.send(err);
//             res.json(users)
//         });
//     })
//     .post(function (req, res) {
//         const user = new User();

//         user.first_name = req.body.first_name;
//         user.last_name = req.body.last_name;
//         user.email = req.body.email;
//         user.password = req.body.password;
//         user.role = req.body.role;
//         user.save(function (err) {
//             if (err)
//                 res.send(err);
//             res.json({ message: 'User successfully created' });
//         });
//     });

router.route('/send-message')
    .post(function (req, res) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing

        console.log(res, req)

        // try {
        //     nodemailer.createTestAccount((err, account) => {
        //         // create reusable transporter object using the default SMTP transport
        //         const transporter = nodemailer.createTransport({
        //             host: 'smtp.gmail.com',
        //             port: 587,
        //             auth: {
        //                 user: process.env.EMAIL_USER || 'aviatotesting@gmail.com',
        //                 pass: process.env.EMAIL_PASS || 'testing123!'
        //             }
        //         });

        //         // setup email data with unicode symbols
        //         let mailOptions = {
        //             from: `"${req.body.name}" <${req.body.email}>`, // sender address
        //             to: 'brianbolnick@gmail.com, alexwalz@icloud.com, pridehsmith@gmail.com, rynwlz@gmail.com', // list of receivers
        //             subject: 'Message from Gilagoat.com', // Subject line
        //             text: req.body.message, // plain text body
        //             html: `<p>${req.body.message}</p>` // html body
        //         };

        //         // send mail with defined transport object
        //         transporter.sendMail(mailOptions, (error, info) => {
        //             if (error) {
        //                 res.status(500).json({
        //                     message: error
        //                 });
        //             }
        //             console.log('Message sent: %s', info.messageId);
        //             // Preview only available when sending through an Ethereal account
        //             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        //             // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        //             // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        //         });
        //     });
        //     res.status(200).json({
        //         message: "Message sent successfully"
        //     });
        // }
        // catch (e) {
        //     res.status(500).json({
        //         message: e
        //     });
        // }
    });

module.exports = router;





