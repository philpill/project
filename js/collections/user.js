define(['backbone', 'models/user'], function(Backbone, UserModel){

	var UserCollection = Backbone.Collection.extend({
		model: UserModel,
		url: 'profile'
	});

	return UserCollection;

});