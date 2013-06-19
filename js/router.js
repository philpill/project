define(['marionette'], function(Marionette){

  router = Marionette.AppRouter.extend({

    appRoutes: {
		'' : 'home',
		'titles' : 'titles',
		'login' : 'login'
    }

  });

  return router;

});