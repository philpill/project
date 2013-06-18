define(['marionette'], function(Marionette){

  router = Marionette.AppRouter.extend({

    controller: {
      listTitles: function() {
        console.log('listTitles()');
      }
    },

    appRoutes: {
      'titles': 'listTitles'
    }

  });

  return router;

});