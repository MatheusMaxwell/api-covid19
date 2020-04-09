const cron = require("node-cron");
let fs = require('fs');

//cron.cronJob("*/5 * * * * *", function() {
    //updateData();
var time = getDateTime();
var timeJson = parse('{"updated": "%s"}', time);
fs.writeFile(__dirname + '/./api/data/dataUpdated.json', JSON.stringify(JSON.parse(timeJson)), function(err){
    if(err){
    return console.log('erro: ' + err)
    }
    console.log('Arquivo data de atualização criado.');
});
//}, null, true, 'America/Sao_Paulo');



function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, () => args[i++]);
}

function updateData(){
    var unirest = require("unirest");

    var req = unirest("GET", "https://covid-19-live-stats.p.rapidapi.com/livestats");

    req.headers({
        "x-rapidapi-host": "covid-19-live-stats.p.rapidapi.com",
        "x-rapidapi-key": "c4818552efmshf898f6bd9af30dcp1c49e0jsn0d88ded18141"
    });

    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        fs.writeFile(__dirname + "/./api/data/data.json", JSON.stringify(res.body), function(err){
            if(err){
                return console.log('erro: ' + err)
            }
            console.log('Arquivo Criado');
            var time = getDateTime();
            var timeJson = parse('{"updated": "%s"}', time);
            fs.writeFile(__dirname + '/./api/data/dataUpdated.json', JSON.stringify(JSON.parse(timeJson)), function(err){
                if(err){
                return console.log('erro: ' + err)
                }
                console.log('Arquivo data de atualização criado.');
            })
        });
    });
}

function getDateTime() {

    var date = new Date();

    var aestTime = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
    aestTime = new Date(aestTime);

    return aestTime.toLocaleString();

}

   
