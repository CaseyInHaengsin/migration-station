const express                       = require('express');
const router                        = new express.Router();
const migrationsController          = require("../controllers/migrationsController")
const coursesController             = require("../controllers/coursesController")
const runMigrationsController       = require("../controllers/runMigration")
const checkMigrationsController     = require("../controllers/checkMigrations")
const countMigrationsController     = require("../controllers/countMigrations")
const axios                         = require('axios')

// mongoose.connect(db_url);



    //////////    Project API ROUTES ///////////////
    router.route('/projects')
    .post(function (req, res) {
        migrationsController.create(req, res);
    })
    .get(function (req, res) {
        migrationsController.findAll(req, res);
    })
    .put(function (req, res) {
        migrationsController.update(req, res);
    })
    .delete(function (req, res) {
        migrationsController.remove(req, res);
    });
    ////////////////////////////////////////////

    

    //////////    Project API ROUTES ///////////////
    router.route('/projects/:id')
    .post(function (req, res) {
        migrationsController.create(req, res);
    })
    .get(function (req, res) {
        migrationsController.findById(req, res);
    })
    .put(function (req, res) {
        migrationsController.update(req, res);
    })
    .delete(function (req, res) {
        migrationsController.remove(req, res);
    });
    ////////////////////////////////////////////

    


    //////////    Courses API ROUTES ///////////////
    router.route('/courses')
    .post(function (req, res) {
        coursesController.create(req, res);
    })
    .get(function (req, res) {
        coursesController.findAll(req, res);
    })
    .put(function (req, res) {
        coursesController.update(req, res);
    })
    .delete(function (req, res) {
        coursesController.remove(req, res);
    });
    ////////////////////////////////////////////



    ////////// Courses By Project ROUTES ///////////////
    router.route('/project-courses/:id')
    .get(function (req, res) {
        coursesController.findAll(req, res);
    })
    ////////////////////////////////////////////




    //////////    Courses API ROUTES ///////////////
    router.route('/courses/:id')
    .get(function (req, res) {
        coursesController.findById(req, res);
    })
    .put(function (req, res) {
        coursesController.update(req, res);
    })
    .delete(function (req, res) {
        coursesController.remove(req, res);
    });
    ////////////////////////////////////////////


    //////////  OAUTH API ROUTES ///////////////
    router.route('/auth/oauth')
        .get(function (req, res) {

            var client_id = '170000000000498'
            axios.get(`https://siteadmin.instructure.com/login/oauth2/auth?client_id=${client_id}&response_type=code&redirect_uri=http://localhost:3000`).then(function(response){
                console.log(response)
            })

        })
        .put(function (req, res) {
            
            
        })
        .delete(function (req, res) {
            

        });

    ////////////////////////////////////////////


    //////////  RUN MIGRATION API ROUTES ///////////////
    router.route('/start-migration/:id')
    .post(function (req, res) {
        runMigrationsController.findAll(req, res);
    })
    .get(function (req, res) {
        runMigrationsController.findById(req, res);
    })
    .put(function (req, res) {
        runMigrationsController.update(req, res);
    })
    .delete(function (req, res) {
        runMigrationsController.remove(req, res);
    });
    ////////////////////////////////////////////



    //////////  RUN MIGRATION API ROUTES ///////////////
    router.route('/check-migration/:id')
        .get(function (req, res) {
            checkMigrationsController.findAll(req, res);
        })

        router.route('/kill-migration/:id')
        .post(function (req, res) {
            runMigrationsController.killScript(req, res);
        })

  
    ////////////////////////////////////////////


    //////////  RUN MIGRATION API ROUTES ///////////////
        router.route('/course-count/:id')
        .get(function (req, res) {
            countMigrationsController.findAll(req, res);
        })
    ////////////////////////////////////////////







module.exports = router;





