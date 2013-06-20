define(function(require) {

	var Marionette = require('marionette');

	var AuthenticationView = Marionette.CompositeView.extend({
		template: '#AuthenticationTemplate'
	});

	return AuthenticationView;

});