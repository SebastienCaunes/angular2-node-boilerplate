const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: String,
    user: { type: Schema.ObjectId, ref: 'User', index: true }
});

mongoose.model('Project', ProjectSchema);
