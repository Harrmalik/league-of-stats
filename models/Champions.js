var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var champSchema = new Schema({
    _id: {type: Number, required: true},
    champName: {type: String, required: true},
    title: {type: String, required: true},
    image: {type: String, required: true},
    available: Boolean,
    difficulty: {type: Number, required: true},
    
});

mongoose.model('Champ', champSchema);