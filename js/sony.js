define(['marionette', 'router', 'controller'], function(Marionette, Router, Controller){


    var Sony = new Marionette.Application();

	Sony.addInitializer(function(options){
		new Router(Controller);
		Backbone.history.start();
	});

	console.log(Sony);

    return Sony;
});