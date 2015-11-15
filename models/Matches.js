var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    champID: {type: Number, required: true},
    winner: {type: Boolean, required: true},
    role: {type: String, required: true},
    lane: {type: String, required: true},
    KDR: {type: Number, required: true},
    
});

mongoose.model('Match', matchSchema);