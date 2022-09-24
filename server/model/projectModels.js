const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://navynot:soloproject@cluster0.qc8zsms.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'DIY'
})
.then(() => console.log('Connected to Mongo DB'))
.catch(err => console.log(err));

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {type: String, required: true},
    items: [{ name: {type: String, required: true}, cost: {type: Number, required: true}, url: String }],
})

module.exports = mongoose.model('project', projectSchema);