const Migrationsdb  = require('../models/Migrations');
const CoursesDb     = require('../models/Courses');
var throttledQueue  = require('throttled-queue');
const axios         = require("axios");
var token           = require('../../env')
token               = token.token

var throttle        = throttledQueue(50, 1000);
var throttle2        = throttledQueue(50, 1000);



module.exports = {

    findAll: function (req, res) {

        var counter         = 0
        var counterLength;

        CoursesDb
            .find({migration: req.params.id})
            .then(function (dbModel) {

                

                
                var domain;

                axios.get('http://localhost:3000/api/projects/'+req.params.id).then(function(response){
                    domain = response.data.domain
                    
                }).then(function(){

                    console.log("Checking Courses")

                    counterLength = dbModel.length

                    dbModel.forEach(course=>{
                        
                        throttle(function() {

                                var clearData={
                                    status: "Not Imported",
                                    errMessage: ""
                                }

                                console.log(course)

                                var courseId    = course._id
                                var projectId   = course.migration
                                var source      = course.source
                                var status      = course.status
                                var sis_id      = course.sis_id
                                var import_id   = parseInt(course.import_id)
                                
                                if(status !== 'Complete'){

                                    var getOptions = {
                                        method: "get",
                                        url: `https://${domain}.instructure.com/api/v1/courses/sis_course_id:${sis_id}/content_migrations`,
                                        headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token, "Content-Type": "application/json" },
                                        data:{}
                                    };


                                    axios(getOptions).then(function(response){

                                        var found = false

                                        response.data.map(migration=>{

                                            if(migration.id === import_id){

                                                found = true
                                                var newStatus = migration.workflow_state

                                                if(newStatus === 'completed'){
                                                    data={ status: "Complete", errMessage: ''}
                                                }else if(newStatus ==='queued'){
                                                    data={ status: "Queued", errMessage: ''}
                                                }else if(newStatus ==='failed'){
                                                    data={ status: "Failed", errMessage: 'Course Failed During Import'}
                                                }else if(newStatus ==='pre_processing'){
                                                    data={ status: "Queued", errMessage: 'Course is stuck in Pre-Processing'}
                                                }else{
                                                    data={ status: "Failed", errMessage: 'Unsure of Course Status.  Please Manually Check.'}
                                                }

                                                updateSuccess(courseId, data)
                                                

                                            }

                                        })

                                        if(!found) {

                                            // Indicates that there was not an import that was ran

                                            var data ={
                                                status: "Not Imported",
                                                errMessage: ""
                                            }

                                            clearError(courseId, data)

                                        }


                                    }).catch(function(err){

                                        if(err.response !== undefined){

                                            if(err.response.status = 401){
                                                var errMessage = "Invalid Authentication Token Provided.  Unauthorized."
                                            }if(err.response.status = 404){
                                                var errMessage = "Course Not Found.  No sis_id found for " + sis_id
                                            }

                                        }else{
                                            var errMessage = "Course Not Found.  No sis_id found for " + sis_id
                                        }
                                        
                                        updateError(courseId, errMessage)
                                    

                                    })
                                }

                        })

                    })

                }).catch(function(err){

                    console.log(err)

                })
                  
            })

            .catch(function (err) {
                console.log(err)
            });




        /////////////////////// HELPER FUNCTIONS ////////////////////////

        responseCheck=()=>{
            if(counter === counterLength){
                console.log("FINISHED")
                res.json({finished: true})
            }
        }


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
                counter ++
                console.log(counter,  "/" , counterLength)

            }).then(function(response){

                responseCheck()

            }).catch(function(err){
                console.log(err)
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
                counter ++
                console.log(counter,  "/" , counterLength)

            }).then(function(response){

                responseCheck()

            }).catch(function(err){
                console.log("Error Updating Success Message")
            })
        }


        clearError=(courseId, data)=>{

            var courseUpdate = {
                method: "PUT",
                url: 'http://localhost:3000/api/courses/'+courseId,
                data: data
            };

            axios(courseUpdate).then(function(response){

                console.log("Updated Course Clear Error report for", courseId)
                counter++

            }).then(function(response){

                responseCheck()

            }).catch(function(err){
                console.log("Error Updating CLEAR ERROR Message")
            })

        }


    },




    clearAll: function (req, res) {

        var clearCount      = 0
        
        CoursesDb
            .find({migration: req.params.id})
            .then(function (dbModel) {

                counterLength = dbModel.length

                dbModel.forEach(course=>{

                    throttle2(function() {

                        if(course.status === "Failed"){
                            clearError(course._id)
                        }else{
                            dontClear()
                        }

                    })

                })


            })

            clearError=(courseId)=>{

                var courseUpdate = {
                    method: "PUT",
                    url: 'http://localhost:3000/api/courses/'+courseId,
                    data: {status: "Not Imported", errMessage: ""}
                };
    
                axios(courseUpdate).then(function(response){
                    clearCount++
                }).then(function(){
                    clearCountCheck()
                }).catch(function(err){
                    console.log("\n\nUnable To Clear Errors\n\n")
                })
    
            }

            dontClear=()=>{
                clearCount++
                clearCountCheck()
            }

            clearCountCheck=()=>{
                if (clearCount === counterLength){
                    res.json({finished: true})
                }
            }



    }

    

};