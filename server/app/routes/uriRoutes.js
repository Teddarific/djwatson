import * as uriController from '../controllers/uriController';

module.exports = (app) => {
  app.route('/songs')
    .get(uriController.getSongs);

  app.route('/dj')
    .post(uriController.dj);
};
