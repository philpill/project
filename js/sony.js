define(function(require){

	var Marionette = require('marionette');
	var Template = require('template');
	var Router = require('router');
	var Controller = require('controller');
	var HomeView = require('views/home');
    var UserModel = require('models/user');
    var AuthenticationView = require('views/authentication');

    var Sony = new Marionette.Application();

	Sony.addInitializer(function(){
		Template.load();
	});

	Sony.addInitializer(function(options){
		new Router({ controller: Controller });
		Backbone.history.start();
	});

	Sony.addRegions({
		mainRegion : '#Main',
		authenticationRegion : '#Authentication'
	});

	function getUserModel(){
		var user = $.cookie('user');
		if (!user) {
			return null;
		}
		var userJSON = JSON.parse(user);
		var userModel = new UserModel(userJSON);
		return userModel;
	}

	Sony.mainRegion.on('show', function(view){
		var user = getUserModel();
		var authenticationView = new AuthenticationView({ model: user });
		Sony.authenticationRegion.reset();
		Sony.authenticationRegion.show(authenticationView);
	});

    return Sony;
});