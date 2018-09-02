const db = require("../models/Courses")
const migrationsDB = require ("../models/Migrations")

module.exports = {
    findAll: function (req, res) {
        db
            .find({})
            .then(function (dbModel) {
                res.json(dbModel);
            })
            .catch(function (err) {
                res.json(err);
            });
    },
    findById: function (req, res) {
        db
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    
    create: function (req, res) {
        db
            .create(req.body)
            .then(dbModel => {
                return migrationsDB.findOneAndUpdate({_id: req.body.migration}, { $push: { courses: dbModel._id } }, { new: true });
            })            
            .then(dbModel => {
                res.json(dbModel);
            })
            .catch(err => {
                console.log(err); 
                res.status(422).json(err);

            });
    },
    update: function (req, res) {
        db
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db
            .findById({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};