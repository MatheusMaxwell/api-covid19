const app = require('./config/express')();
const port = app.get('port');
const cron = require("node-cron");
let fs = require('fs');

//* 19 * * *
cron.schedule("* * * * *", function() {
  var unirest = require("unirest");

  var req = unirest("GET", "https://covid-19-live-stats.p.rapidapi.com/livestats");

  req.headers({
    "x-rapidapi-host": "covid-19-live-stats.p.rapidapi.com",
    "x-rapidapi-key": "d7f91f96fbmsh3b19878588c3ce6p1f5b9fjsnbb905c9c8d6a"
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    fs.writeFile(__dirname + "/./api/data/data.json", JSON.stringify(res.body), function(err){
      if(err){
        return console.log('erro: ' + err)
      }
      console.log('Arquivo Criado');
    });
  });
  console.log("running a task every minute");
});

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});