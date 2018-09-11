const Migrationsdb  = require('../models/Migrations');
const CoursesDb     = require('../models/Courses');
var throttledQueue  = require('throttled-queue');
const axios         = require("axios");
var token           = require('../../env')
token               = token.token

//// Allowing 10 requests every second//
var throttle = throttledQueue(10, 1000);

module.exports = {

    findAll: function (req, res) {
        CoursesDb
            .find({migration: req.params.id})
            .then(function (dbModel) {

                var domain;

                axios.get('http://localhost:3000/api/projects/'+req.params.id).then(function(response){
                    domain = response.data.domain
                    
                }).then(function(){

                    console.log("Checking Courses")

                    dbModel.forEach(course=>{

                                var courseId    = course._id
                                var projectId   = course.migration
                                var source      = course.source
                                var status      = course.status
                                var sis_id      = course.sis_id
                                var import_id   = course.import_id
                                
                                if(status !== 'Complete'){

                                    var getOptions = {
                                        method: "get",
                                        url: `https://${domain}.instructure.com/api/v1/courses/sis_course_id:${sis_id}/content_migrations`,
                                        headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token, "Content-Type": "application/json" },
                                        data:{}
                                    };

                                    

                                    axios(getOptions).then(function(response){

                                        response.data.map(migration=>{

                                            if(migration['id'] === import_id){

                                                var newStatus = migration.workflow_state

                                                if(newStatus === 'completed'){
                                                    data={ status: "Complete", errMessage: ''}
                                                }else if(newStatus ==='queued'){
                                                    data={ status: "Queued", errMessage: ''}
                                                }else if(newStatus ==='failed'){
                                                    data={ status: "Failed", errMessage: 'Course Failed During Import'}
                                                }else if(newStatus ==='pre_processing'){
                                                    data={ status: "Queued", errMessage: 'Course is stuck in Pre-Processing'}
                                                }

                                                updateSuccess(courseId, data)

                                            }

                                        })

                                    }).catch(function(err){

                                        console.log(err)
                                        var errMessage = "No Course Found with the sis_id of" + sis_id
                                        updateError(courseId, errMessage)

                                    })
                                }

                    })

            })
                  
            }).then(function(response){
                
            })
            .catch(function (err) {
                console.log(err)
            });




        /////////////////////// HELPER FUNCTIONS ////////////////////////

        updateError =(CourseId, errMessage)=>{
            var courseUpdate = {
                method: "PUT",
                url: 'http://localhost:3000/api/courses/'+CourseId,
                data: {
                    status: "Failed",
                    errMessage: errMessage
                }
            };

            axios(courseUpdate).then(function(response){

                console.log("Updated Course ERROR report for", CourseId)

            })

        }

        updateSuccess=(courseId, data)=>{

            var courseUpdate = {
                method: "PUT",
                url: 'http://localhost:3000/api/courses/'+courseId,
                data: data
            };

            axios(courseUpdate).then(function(response){

                console.log("Updated Course SUCCESS report for", courseId)

            }).catch(function(err){
                console.log("Error Updating Success Message")
            })
        }


    }



    // findById: function (req, res) {
    //     Migrationsdb
    //         .findById(req.params.id)
    //         .populate('Course')
    //         .then(function (dbModel) {

    //             var domain          = dbModel.domain

    //             dbModel.courses.map(course=>{
    //                 throttle(function() {
    //                     axios.get("http://localhost:3000/api/courses/"+course)
    //                     .then(function (response) {

    //                         var CourseId    = response.data._id
    //                         var projectId   = response.data.migration
    //                         var source      = response.data.source
    //                         var status      = response.data.status
    //                         var sis_id      = response.data.sis_id
    //                         var import_id   = response.data.import_id

    //                         if(status !== 'Complete'){

    //                             var getOptions = {
    //                                 method: "get",
    //                                 url: `https://${domain}.instructure.com/api/v1/courses/sis_course_id:${sis_id}/content_migrations`,
    //                                 headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token, "Content-Type": "application/json" },
    //                                 data:{}
    //                             };

                                

    //                             axios(getOptions).then(function(response){
                                    
    //                                 response.data.map(migration=>{
    //                                     if(migration.attachment.id === import_id){

    //                                         var newStatus = migration.workflow_state

    //                                         if(newStatus === 'completed'){
    //                                             data={ status: "Complete", errMessage: ''}
    //                                         }else if(newStatus ==='queued'){
    //                                             data={ status: "Queued", errMessage: ''}
    //                                         }else if(newStatus ==='failed'){
    //                                             data={ status: "Failed", errMessage: 'Course Failed During Import'}
    //                                         }


    //                                         var courseUpdate = {
    //                                             method: "PUT",
    //                                             url: 'http://localhost:3000/api/courses/'+CourseId,
    //                                             data: data
    //                                         };
                                
    //                                         axios(courseUpdate).then(function(response){

    //                                             console.log("Successfully Checking Course:", response.status)

    //                                         }).error(function(err){
    //                                             console.log(err)
    //                                         })

    //                                     }

    //                                 })

    //                             }).catch(function(err){

    //                             })
    //                         }

    //                     })
    //                     .catch( function (error) { console.log(error) })
                        
    //                 });
    //               })
                  
    //         }).then(function(response){
                
    //         })
    //         .catch(function (err) {
    //             console.log(err)
    //         });




    //     /////////////////////// HELPER FUNCTIONS ////////////////////////

    //     updateError =(CourseId, errMessage)=>{
    //         var courseUpdate = {
    //             method: "PUT",
    //             url: 'http://localhost:3000/api/courses/'+CourseId,
    //             data: {
    //                 status: "Failed",
    //                 errMessage: errMessage
    //             }
    //         };

    //         axios(courseUpdate).then(function(response){

    //             console.log("Updated Course ERROR report")

    //         })

    //     }

    //     updateSuccess=(courseId, data)=>{

    //         console.log("Updating Success")

    //         var courseUpdate = {
    //             method: "PUT",
    //             url: 'http://localhost:3000/api/courses/'+courseId,
    //             data: data
    //         };

    //         axios(courseUpdate).then(function(response){

    //             console.log(response.status)

    //         }).error(function(err){
    //             console.log(err)
    //         })
    //     }


    // }

};