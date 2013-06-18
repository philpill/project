define(['marionette'], function(Marionette){

  router = Marionette.AppRouter.extend({

    controller: {
      registerUser: function(){

      },
      signinUser: function() {

      },
      getProfileById: function() {

      },
      getTitlesByUser: function() {

      },
      getTitleByUser: function() {

      },
      listTitles: function() {

      }
    },

    appRoutes: {
      "register/:username": "registerUser", //PUT
      "signin/:username/:password": "signinUser", //GET
      "profile/:userId": "getProfileById", //GET/PUT
      "profile/:userId/titles": "getTitlesByUser", //GET
      "profile/:userId/titles/:titleId": "getTitleByUser", //PUT/DELETE
      "gametitles/list": "listTitles" //GET
    }

  });

  return router;

});