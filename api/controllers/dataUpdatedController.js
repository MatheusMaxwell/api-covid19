
module.exports = () => {
    const controller = {};
    let fs = require('fs');
    var dataDB;
  
    fs.readFile(__dirname + "/../data/dataUpdated.json", (err, data) => {
      if (err) throw err;
      fileExists = true;
      dataDB = require('../data/dataUpdated.json');
    });
  
    controller.listData = (req, res) => res.status(200).json(dataDB);
  
    return controller;
  }
  