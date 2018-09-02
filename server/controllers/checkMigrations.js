const Migrationsdb  = require('../models/Migrations');
var throttledQueue  = require('throttled-queue');
const axios         = require("axios");
const request       = require('request');
const fs            = require('fs');
var token           = require('../../env')
token               = token.token

//// Allowing 10 requests every second//
var throttle = throttledQueue(10, 1000);

module.exports = {

    findById: function (req, res) {
        Migrationsdb
            .findById(req.params.id)
            .populate('Course')
            .then(function (dbModel) {

                var domain          = dbModel.domain

                dbModel.courses.map(course=>{
                    throttle(function() {
                        axios.get("http://localhost:3000/api/courses/"+course)
                        .then(function (response) {

                            var CourseId    = response.data._id
                            var projectId   = response.data.migration
                            var source      = response.data.source
                            var status      = response.data.status
                            var sis_id      = response.data.sis_id
                            var import_id   = response.data.import_id


                            var getOptions = {
                                method: "get",
                                url: `https://${domain}.instructure.com/api/v1/courses/sis_course_id:${sis_id}/content_migrations`,
                                headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token, "Content-Type": "application/json" },
                                data:{}
                            };

                            

                            axios(getOptions).then(function(response){
                                
                                response.data.map(migration=>{
                                    if(migration.attachment.id === import_id){

                                        var newStatus = migration.workflow_state

                                        if(newStatus === 'completed'){
                                            data={ status: "Complete", errMessage: ''}
                                        }else if(newStatus ==='queued'){
                                            data={ status: "Queued", errMessage: ''}
                                        }else if(newStatus ==='failed'){
                                            data={ status: "Failed", errMessage: 'Course Failed During Import'}
                                        }


                                        var courseUpdate = {
                                            method: "PUT",
                                            url: 'http://localhost:3000/api/courses/'+CourseId,
                                            data: data
                                        };
                            
                                        axios(courseUpdate).then(function(response){

                                            console.log("Successfully Checking Course:", response.status)

                                        }).error(function(err){
                                            console.log(err)
                                        })

                                    }

                                })

                            }).catch(function(err){

                            })


                        })
                        .catch( function (error) { console.log(error) })
                    });
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

                console.log("Updated Course ERROR report")

            })

        }

        updateSuccess=(courseId, data)=>{

            console.log("Updating Success")

            var courseUpdate = {
                method: "PUT",
                url: 'http://localhost:3000/api/courses/'+courseId,
                data: data
            };

            axios(courseUpdate).then(function(response){

                console.log(response.status)

            }).error(function(err){
                console.log(err)
            })
        }


    }

};