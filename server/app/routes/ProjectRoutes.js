/**
 * Created by nicolascunin on 09/11/2015.
 */
'use strict';

var passport = require('passport'),
    authorization = require('./middlewares/authorization'),
    ProjectController = require('../controllers/ProjectController');

module.exports = function(app)
{
    app.route('/projects').get(authorization.requiresLogin, ProjectController.projectsOfUser);

    app.route('/projects/:id').get(authorization.requiresLogin, ProjectController.project);

    app.route('/projects').post(authorization.requiresLogin, ProjectController.save);

    app.route('/projects/:id').put(authorization.requiresLogin, ProjectController.update);

    app.route('/projects/:id').delete(authorization.requiresLogin, ProjectController.delete);

};