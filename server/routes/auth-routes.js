const express = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../../config');
const db_url = process.env.MONGODB_URI || config.dbUri
mongoose.connect(db_url);

require('../passport/local-signup');
require('../passport/local-login');

const router = new express.Router();

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
        isFormValid = false;
        errors.username = 'Please provide your username.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}


// router.post('/signup', (req, res) => {
//     // if (!validationResult.success) {
//     //     return res.status(400).json({
//     //         success: false,
//     //         message: "something went wrong",
//     //         data: req.body
//     //     });
//     // }
//     console.log("in controller");
//     console.log("body", req.body);
//     return res.status(200).json({
//         message: 'Sign up successful',
//         data: req.body
//     });
// });

router.post('/signup', (req, res, next) => {
    // const validationResult = validateSignupForm(req.body);
    // if (!validationResult.success) {
    //     return res.status(400).json({
    //         success: false,
    //         message: validationResult.message,
    //         errors: validationResult.errors
    //     });
    // }


    console.log(req.body);
    return passport.authenticate('local-signup', (err) => {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                return res.status(409).json({
                    success: false,
                    message: 'Check the form for errors.',
                    errors: {
                        email: 'This email is already taken.'
                    }
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.',
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.'
        });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {

    console.log(req.body)

    const validationResult = validateLoginForm(req.body);

    console.log(validationResult)
    
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('local-login', (err, token, userData) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }


        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
        });
    })(req, res, next);

    console.log(req.body)
});


module.exports = router;