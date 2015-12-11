 var express = require('express');
var request = require('request');
var router = express.Router();
// var keys = require("../league_api/keys.js");
var regions = require("../data/regions");
var mongoose = require('mongoose');
var Matches = mongoose.model('Match');
var fs = require('fs');
console.log(regions[0].value);

/* GET home page. */
router.get('/availableChamps', function(req, res, next) {
    request.get('https://na.api.pvp.net/api/lol/na/v1.2/champion?freeToPlay=true&api_key=' + keys[1], function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //Gets available champs for the week.
        res.send(body);
      }
    });
});


router.get('/champDifficulty', function(req, res, next) {
    var champArray = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','48','50','51','53','54','55','56','57','58','59','60','61','62','63','64','67','68','69','72','74','75','76','77','78','79','80','81','82','83','84','85','86','89','90','91','92','96','98','99','101','102','103','104','105','106','107','110','111','112','113','114','115','117','119','120','121','122','126','127','131','133','134','143','150','154','157','161','201','203','222','223','236','238','245','254','266','267','268','412','421','429','432'];
    for(var i = 0; i< champArray.length; i++){
    request.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + champArray[i] + '?champData=all&api_key=' + keys[1], function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var champDiff = [];
        var tempChamp = {};
        
        
            body = JSON.parse(body);
            
            // var theName = champArray[i];
            tempChamp._id = body.id;
            tempChamp.name = body.name;
            tempChamp.difficulty = body.info.difficulty;
            champDiff.push(tempChamp);
            console.log(tempChamp);
            if (tempChamp._id == 429){
                console.log("in it")
                return res.send(JSON.parse(champDiff));
            }
        }
        
     
      
    });
    }
    //res.send(JSON.parse(champDiff));
});


// router.get('/allChamps', function(req, res, next) {
//     request.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?locale=en_US&dataById=true&champData=all&api_key=' + keys[1], function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         //res.send(JSON.parse(body)); 
//       body = JSON.parse(body);
//         var champions = [];
//       for (var j = 0; j <body.length;j++){
//         champions.push({
//             champID: body.id,
//             champName: body.name,
//             image: body.image.name,
//             difficulty: body.info.difficulty
//         });
//     }
//     return res.send(champions);
//     }});
// });

router.get('/matches/:id', function(req, res, next) {
    //1989504754
    for(var i = 0; i<regions.length; i++) {
      //Keeps running even if it found a match fix later
      var method = "https://" + regions[i].value + ".api.pvp.net/api/lol/" + regions[i].value + "/v2.2/match/" + req.param('id') + "?api_key=";
      request.get(method + keys[1], function (error, response, body) {
         if (!error && response.statusCode == 200) {
          body = JSON.parse(body);
          var championsPlayed = [];
          for (var j = 0; j <body.participants.length;j++){
             championsPlayed.push({
              championId: body.participants[j].championId,
              winner: body.participants[j].stats.winner,
              role: body.participants[j].timeline.role,
              lane: body.participants[j].timeline.lane,
            //   KDR: (body.participants[j].stats.kills) / body.participants[j].stats.deaths
              kills: body.participants[j].stats.kills,
              deaths: body.participants[j].stats.deaths,
              assists: body.participants[j].stats.assists
            });
          }
          
          var newMatch = new Matches();
          
          newMatch.matchId = body.matchId;
          newMatch.region = body.region;
          newMatch.matchCreation = new Date(body.matchCreation);
          newMatch.matchMode = body.matchMode;
          newMatch.queueType = body.queueType;
          newMatch.season = body.season;
          newMatch.champions = championsPlayed;
        console.log(newMatch);
          newMatch.save(function(err){
              if(err){
                  return res.send("Something broke in the matches api");
              }
              
              console.log(newMatch._id + " is now a match!");
              
          });
           
            
         }  
      });
    }
    return res.send("It worked.");
});

router.get('/allRegions', function(req, res, next) {
  res.send(regions);
});

router.get('/fullImage', function(req, res, next) {
      //Keeps running even if it found a match fix later
      var champArray = ["Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "Azir", "Bard", "Blitzcrank", "Brand", "Braum", "Caitlyn", "Cassiopeia", "Chogath", "Corki", "Darius", "Diana", "DrMundo", "Draven", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Irelia", "Janna", "JarvanIV", "Jax", "Jayce", "Jinx", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kennen", "Khazix", "Kindred", "KogMaw", "LeBlanc", "Sin", "Leona", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "MasterYi", "MissFortune", "Mordekaiser", "Morgana", "Nami", "Nasus", "Nautilus", "Nidalee", "Nocturne", "Nunu", "Olaf", "Orianna", "Pantheon", "Poppy", "Quinn", "Rammus", "RekSai", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Sejuani", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Syndra", "Kench", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "TwistedFate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Velkoz", "Vi", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xerath", "XinZhao", "Yasuo", "Yorick", "Zac", "Zed", "Ziggs", "Zilean", "Zyra"];
      for(var i = 0; i< champArray.length; i++){
          var method = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champArray[i] + "_0.jpg";
          var ws = fs.createWriteStream('../public/images/' + champArray[i] + '.jpg');
          ws.on('error', function(err) { console.log(err); });
          request(method).pipe(ws);
      }
      return res.send("who knows");
});

router.get('/thumbnail/:name', function(req, res, next) {
      //Keeps running even if it found a match fix later
      var method = "http://ddragon.leagueoflegends.com/cdn/5.22.3/img/champion/" + req.params.name + ".png";
      var ws = fs.createWriteStream('../public/images/thumbnails/' + req.params.name + '.png');
      ws.on('error', function(err) { console.log(err); });
      request(method).pipe(ws);
      
      return res.send("who knows");
});



router.get('/maliktest/:id', function(req, res, next) {
    //1989504754
    for(var i = 0; i<regions.length; i++) {
      //Keeps running even if it found a match fix later
      var method = "https://na.api.pvp.net/api/lol/"+ regions[i].value + "/v2.2/match/" + req.param('id') + "?api_key=";
      request.get(method + keys[1], function (error, response, body) {
         if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
         }  
      });
    }
});


module.exports = router;