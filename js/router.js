define(['marionette'], function(Marionette){

  router = Marionette.AppRouter.extend({

    controller: {
      someMethod: function(){ /*...*/ }
    },

    appRoutes: {
      "some/route": "someMethod"
    },

    routes : {
      "some/otherRoute" : "someOtherMethod"
    },
    someOtherMethod : function(){

    }

  });

  return router;

});