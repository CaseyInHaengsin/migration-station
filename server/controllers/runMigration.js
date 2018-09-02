const Migrationsdb  = require('../models/Migrations');
var throttledQueue  = require('throttled-queue');
const axios         = require("axios");
const request       = require('request');
const fs            = require('fs');
var token           = require('../../env')
token               = token.token


var throttle = throttledQueue(3, 1500, true);

module.exports = {

    findById: function (req, res) {
        Migrationsdb
            .findById(req.params.id)
            .populate('Course')
            .then(function (dbModel) {

                var domain          = dbModel.domain
                var importType      = dbModel.importType
                var createShells    = dbModel.createShells
                var path            = dbModel.path

                dbModel.courses.map(course=>{
                    throttle(function() {
                        axios.get("http://localhost:3000/api/courses/"+course)
                        .then(function (response) {

                            var CourseId    = response.data._id
                            var projectId   = response.data.migration
                            var source      = response.data.source
                            var status      = response.data.status
                            var sis_id      = response.data.sis_id

                            if(status !== "Queued"){
                                if(status !== 'Complete'){
                                    if(status !== 'Importing'){
                                        if (!createShells){

                                            var postOptions = {
                                                method: "POST",
                                                url: `https://${domain}.instructure.com/api/v1/courses/sis_course_id:${sis_id}/content_migrations`,
                                                headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token, "Content-Type": "application/json" },
                                                data:{
                                                    migration_type: importType,
                                                    pre_attachment: {
                                                        "name": source
                                                    }
                                                }
                                            };

                                            axios(postOptions).then(function(response){

                                                var params      = response.data.pre_attachment.upload_params
                                                Object.assign(params, {file: fs.createReadStream('../'+path+"/"+source),});

                                                request.post({url: response.data.pre_attachment.upload_url, formData: params}, function optionalCallback(err, httpResponse, body) {

                                                    if (err) {

                                                        var errMessage = 'No file or directory was found.  Check your Path to the source files.'
                                                        updateError(CourseId, errMessage)

                                                    }else{

                                                        var successRedirect = httpResponse.request.response.headers.location

                                                        var redirectPost = {
                                                            method: "POST",
                                                            url: successRedirect,
                                                            headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token, "Content-Type": "application/json" },
                                                            data:{}
                                                        };
                    
                                                        axios(redirectPost).then(function(response){

                                                            var data;

                                                            if(response.status === 200){
                                                                data ={ status: "Importing", import_id: response.data.id, errMessage: '' }
                                                            }else if( response.status === 404){
                                                                data ={ status: "Failed", errMessage: "No Course Found Using sis_id Provided" }
                                                            }else{
                                                                data ={ status: "Failed", errMessage: "Please Visit Course" }
                                                            }

                                                            updateSuccess(CourseId, data)

                                                        })
                                                    }

                                                });
                                                    

                                            }).catch(function(err){
                                                var errMessage = 'No course was found with this sis_id'
                                                updateError(CourseId, errMessage)
                                                console.log(err.response.status)
                                            })

                                        }else{
                                    }

                                        //// TODO:  Add code here to handle creating the course shell first, then importing the content.  /////

                                    }
                                }
                            }


                        })
                        .catch( function (error) { console.log(error) })
                    });
                  })
            })
            .then(dbModel => res.json(dbModel))
            .catch(function (err) {
                res.json(err);
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

            var courseUpdate = {
                method: "PUT",
                url: 'http://localhost:3000/api/courses/'+courseId,
                data: data
            };

            axios(courseUpdate).then(function(response){

                console.log(response.status)

            }).catch(function(err){
                console.log(err)
            })
        }


    }

};