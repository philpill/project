define(['marionette', 'router', 'controller', 'views/home'], function(Marionette, Router, Controller, HomeView){


    var Sony = new Marionette.Application();

	Sony.addInitializer(function(options){
		new Router(Controller);
		Backbone.history.start();
	});

	Sony.addInitializer(function(options){
		var homeView = new HomeView();
		Sony.mainRegion.show(homeView);
	});

	Sony.addRegions({
		mainRegion: "#Main"
	});

	console.log(Sony);

    return Sony;
});