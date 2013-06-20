define(['marionette'], function(Marionette){

  router = Marionette.AppRouter.extend({

    appRoutes: {
		'' : 'home',
		'titles' : 'titles',
		'login' : 'login',
		'profile' : 'profile',
		'profile/new' : 'profileNew',
		'profile/games' : 'profileGames',
		'register' : 'register',
		'logout' : 'logout',
		'about' : 'about'
    }

  });

  return router;

});