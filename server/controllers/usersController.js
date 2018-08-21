const db = require("../models")
const userDB = require("../models/User")

module.exports = {
    findAll: function (req, res) {
        userDB
            .find({})
            .then(function (dbModel) {
                res.json(dbModel);
            })
            .catch(function (err) {
                res.json(err);
            });
    },
    findById: function (req, res) {
        userDB
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    //////// AUTHENTICATION ROUTE ///////////////////
    
    findeOne: function (req, res){
        userDB
            .findOne({'username': req.body.username}, function(err, user){
                var response = {
                    authenticated: false,
                    message: ""
                }

                if( user !== null){

                    if(user.password === req.body.password){
                        response.authenticated = true
                    }else{
                        response.message = "invalid password"
                    }

                }else{

                    response.message = "invalid username"
                }
                


                res.json(response)

            })
    },

    create: function (req, res) {
        console.log(req.body);
        userDB
            .create(req.body)
            .then(dbModel => {
                res.json(dbModel);
            })
            .catch(err => {
                console.log(err);
                res.status(422).json(err);

            });
    },
    update: function (req, res) {
        userDB
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        userDB
            .findById({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};