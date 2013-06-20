define(['backbone'], function(Backbone){

	var UserModel = Backbone.Model.extend({
		url: '/profile'
	});

	return UserModel;

});