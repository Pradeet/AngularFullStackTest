/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/companyEvents', require('./api/companyEvent'));
  app.use('/api/companies', require('./api/company'));
  app.use('/api/events', require('./api/event'));
  app.use('/api/companyOfficials', require('./api/companyOfficial'));
  app.use('/api/officer', require('./api/officer'));
  app.use('/api/committee', require('./api/committee'));
  app.use('/api/students', require('./api/student'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
