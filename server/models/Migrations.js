const mongoose = require('mongoose');
const Schema = mongoose.Schema;


    var MigrationsSchema = new Schema({
        name: String,
        date: String,
        domain: String,
        path: String,
        importType: String,
        complete: Boolean,
        courseShells: Boolean,
        courses: [{ type: Schema.Types.ObjectId, ref: 'Courses', required: false }],
    });

    module.exports = mongoose.model('Migrations', MigrationsSchema);