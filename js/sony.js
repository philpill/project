define(['marionette', 'router'], function(Marionette, Router){


    var Sony = new Marionette.Application();

	Sony.addInitializer(function(options){
		new Router();
		Backbone.history.start();
	});

	console.log(Sony);

    return Sony;
});