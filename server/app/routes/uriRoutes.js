import * as uriController from '../controllers/uriController';

module.exports = (app) => {
  app.route('/getSongs')
    .get(uriController.getSongs);

  app.route('/dj')
    .post(uriController.dj);
};
