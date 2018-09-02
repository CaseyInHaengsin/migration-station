const Migrationsdb  = require('../models/Migrations');
const axios         = require("axios");

module.exports = {

    findById: function (req, res) {
        Migrationsdb
            .findById(req.params.id)
            .populate('Course')
            .then(function (dbModel) {

                var data={
                    notImported: 0,
                    importing: 0,
                    complete: 0,
                    queued: 0,
                    failed: 0
                }

                const promises = dbModel.courses.map(course=> {
                    
                    return axios.get("http://localhost:3000/api/courses/"+course)
              
                       .then(function (response) {
              
                        var status = response.data.status

                        if (status === 'Complete'){
                            data.complete++
                        }else if( status === 'Not Imported'){
                            data.notImported++
                        }else if( status === 'Queued'){
                            data.queued++
                        }else if( status === 'Failed'){
                            data.failed++
                        }else if( status === 'Importing'){
                            data.importing++
                        }
           
                         return data
              
                       })
               })
              

               Promise.all(promises)
                .then(data => {
                    var finalData = data[data.length - 1]
                    res.json(finalData)
                })
                .catch(error => {
                  console.log("error", error);
                });

            }).catch(function (err) {
                res.json(err);
            });
    }

};