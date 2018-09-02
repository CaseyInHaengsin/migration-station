const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
    
    var CoursesSchema = new Schema({
        course_name: String,
        source: String,
        sis_id: String,
        course_number: Number,
        status: String,
        errMessage: String,
        import_id: Number,
        migration: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Migrations'
          }
    });



    module.exports = mongoose.model('Courses', CoursesSchema);