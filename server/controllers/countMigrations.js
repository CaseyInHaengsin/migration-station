const db = require("../models/Courses")
const axios         = require("axios");

module.exports = {

    findAll: function (req, res) {
        db
            .find({migration: req.params.id})
            .then(function (dbModel) {

                var counter = 0

                var data={
                    notImported: 0,
                    importing: 0,
                    complete: 0,
                    queued: 0,
                    failed: 0
                }

                dbModel.forEach(function(course) {
                    var status = course.status
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
                    counter++
                  });

                  if(counter === dbModel.length){
                    Object.assign(data, {count: (data.complete + data.importing + data.failed + data.queued +data.notImported)});
                    res.json(data)
                  }
                    

            //    Promise.all(promises)
            //     .then(data => {
            //         var finalData = data[data.length - 1]
            //         console.log(finalData)
            //         res.json(finalData)
            //     })
            //     .catch(error => {
            //       console.log("error", error);
            //     });

            }).catch(function (err) {
                res.json(err);
            });
    }

};