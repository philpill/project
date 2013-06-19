define(['marionette', 'router', 'controller', 'views/home'], function(Marionette, Router, Controller, HomeView){

    var Sony = new Marionette.Application();

	Sony.addInitializer(function(options){
		new Router({ controller: Controller });
		Backbone.history.start();
	});

	Sony.addRegions({
		mainRegion: "#Main"
	});

	console.log(Sony);

    return Sony;
});