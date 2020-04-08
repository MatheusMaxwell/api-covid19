module.exports = app => {
    const controller = require('../controllers/dataController')();
  
    app.route('/api/v1/data').get(controller.listData);
  }