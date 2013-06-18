define(['marionette'], function(Marionette){

  router = Marionette.AppRouter.extend({

    appRoutes: {
      'titles': 'listTitles'
    }

  });

  return router;

});