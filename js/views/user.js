define(['marionette'], function(Marionette){

	var UserView = Marionette.ItemView.extend({
		template: '#UserTemplate'
	});

	return UserView;

});