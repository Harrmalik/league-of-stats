
function generateMatchCall(){
    var regions = ["BR", "EUNE", "EUW", "KR", "LAN", "LAS", "NA", "OCE", "PBE", "RU", "TR"] ;
    var method;
    for(var j = 1989504754; j < 10000000000; j++){
        for(var i = 0; i<regions.length; i++) {
          
          var method = "/api/lol/" + regions[i] + "/v2.2/match/" + j + ".json";
        
            if(i+1 == regions.length){
                i = 0;
            }else{
                i = i;
            }
        
        }
        if(j+1 ==10000000000){
            j = 1000000000;
        }else{
            j = j;
        }
    }

} 