var express = require('express');
var request = require('request');
var router = express.Router();
var keys = require("../league_api");
var regions = require("../data/regions");
console.log(regions[0].value);

/* GET home page. */
router.get('/availableChamps', function(req, res, next) {
    request.get('https://na.api.pvp.net/api/lol/na/v1.2/champion?freeToPlay=true&api_key=' + keys[1], function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //Gets available champs for the week.
        console.log(body); 
        res.send(body);
      }
        
    });
});

router.get('/allChamps', function(req, res, next) {
    request.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?locale=en_US&dataById=true&champData=all&api_key=' + keys[1], function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Google homepage.
        res.send(JSON.parse(body)); 
      }   
    });
});

router.get('/matches/:id', function(req, res, next) {
    //1989504754
    for(var i = 0; i<regions.length; i++) {
      var match = {};
      //Keeps running even if it found a match fix later
      var method = "https://na.api.pvp.net/api/lol/"+ regions[i].value + "/v2.2/match/" + req.param('id') + "?api_key=";
      request.get(method + keys[1], function (error, response, body) {
         if (!error && response.statusCode == 200) {
           body = JSON.parse(body);
           var championsPlayed = [];
           for (var j = 0; j <body.participants.length;j++){
             championsPlayed.push({
               champID: body.participants[j].championId,
               winner: body.participants[j].stats.winner,
               role: body.participants[j].timeline.role,
               lane: body.participants[j].timeline.lane,
               KDR: (body.participants[j].stats.kills) / body.participants[j].stats.deaths
            });
           }
          match = {
            champions: championsPlayed,
            gameMode: body.matchMode,
            date: new Date(body.matchCreation),
            region: body.region
          };
            
           
            return res.send(match);
         }  
      });
    }
});

router.get('/allRegions', function(req, res, next) {
  res.send(regions);
});


module.exports = router;