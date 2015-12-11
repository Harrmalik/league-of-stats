var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    matchId: {type: String, required: true},
    region: {type: String, required: true},
    matchMode: {type: String, required: true},
    queueType: {type: String, required: true},
    matchCreation: {type: Date, required: true},
    season: {type: String, required: true},
    champions:[{
        championId: {type: String, required: true},
        imgPath: String,
        available: String,
        difficulty: String,
        role: {type: String, required: true},
        lane: {type: String, required: true},
        winner: {type: Boolean, required: true},
        kills: {type: Number, required: true},
        deaths: {type: Number, required: true},
        assists: {type: Number, required: true},
    }]
});

mongoose.model('Match', matchSchema);