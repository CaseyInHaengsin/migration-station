const Migrationsdb  = require('../models/Migrations');
const db            = require('../models/Courses')
var throttledQueue  = require('throttled-queue');
const axios         = require("axios");
const request       = require('request');
const fs            = require('fs');
var token           = require('../../env')
token               = token.token



var throttle = throttledQueue(3, 1500, true);

module.exports = {


    findAll: function(req, res){

    db
        .find({migration: req.params.id})
        .then(function (dbModel) {

            var domain;
            var path; 
            var courseShells;
            var importType;
            var complete;

            axios.get('http://localhost:3000/api/projects/'+req.params.id).then(function(response){

                domain          = response.data.domain
                path            = response.data.path
                courseShells    = response.data.courseShells
                importType      = response.data.importType
                complete        = response.data.complete


            }).then(function(response){

                dbModel.forEach(course=>{

                    throttle(function() {

                        if(course.status !== "Queued" && course.status !== 'Complete' && course.status !== 'Importing'){

                            if (!course.createShells){

                                var postOptions = {
                                    method: "POST",
                                    url: `https://${domain}.instructure.com/api/v1/courses/sis_course_id:${course.sis_id}/content_migrations`,
                                    headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token, "Content-Type": "application/json" },
                                    data:{
                                        "migration_type": importType,
                                        "pre_attachment": {
                                            "name": course.source,
                                        }
                                    }
                                };

                                axios(postOptions).then(function(response){

                                    var params      = response.data.pre_attachment.upload_params
                                    var import_id   = response.data.audit_info.id

                                    Object.assign(params, {file: fs.createReadStream('..'+path+"/"+course.source)});

                                    request.post({headers: {"Content-Type": "multipart/form-data"}, url: response.data.pre_attachment.upload_url, formData: params}, function optionalCallback(err, response, body) {

                                        if (err) {

                                            var errMessage = 'No file or directory was found.  Check your Path to the source files.'
                                            updateError(course._id, errMessage)

                                        }else{

                                            var statusCode = response.headers.status
                                            var successRedirect = response.headers.location

                                            if(statusCode === '201 Created'){

                                                var data = {
                                                    status: "Importing",
                                                    import_id: import_id
                                                }

                                                updateSuccess(course._id, data)

                                            }else{

                                                var redirectPost = {
                                                    method: "POST",
                                                    url: successRedirect,
                                                    headers: { "User-Agent": "Request-Promise", Authorization: "Bearer " + token, "Content-Type": "application/json" },
                                                };

                                                axios(redirectPost).then(function(response){

                                                    console.log("SUCCESS")
                                                    var data = {}

                                                    if(response.status === 200){
                                                        data ={ status: "Importing", import_id: import_id, errMessage: '' }
                                                    }else if( response.status === 404){
                                                        data ={ status: "Failed", errMessage: "No Course Found Using sis_id Provided" }
                                                    }else{
                                                        data ={ status: "Failed", errMessage: "Please Visit Course" }
                                                    }

                                                    updateSuccess(course._id, data)

                                                }).catch(function(err){
                                                    console.log("ERROR ON REDIRECTPOST AFTER FILE HAS BEEN UPLOADED TO CANVAS AWS\n\n\n")
                                                    console.log(err.response.status, err.response.statusText)
                                                    console.log('\n\n\n')
                                                })

                                            }
                                        }

                                    })
                                        
                                }).catch(function(err){
                                    console.log("ERROR MAKING PREATTACHMENT POST TO CANVAS\n\n\n")
                                    console.log(err)
                                    console.log("\n\n\n")
                                })

                            }
                        }

                    })

                })

            })

        })

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

            }).catch(function(err){
                console.log("PROBLEM WITH UPDATEERROR FUNCTION")
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
                console.log("PROBLEM WITH UPDATESUCCESS FUNCTION")
            })
        }

    }


















};