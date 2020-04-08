module.exports = app => {
    const controller = require('../controllers/dataController')();
    const controllerUpdated = require('../controllers/dataUpdatedController')();
  
    app.route('/api/v1/data').get(controller.listData);
    app.route('/api/v1/data_updated').get(controllerUpdated.listData);
  }