define(['marionette'], function(Marionette){

	var homeView = Marionette.ItemView.extend({
	  template: "#HomeTemplate",
	  tagName: 'section',
	  className: 'home'
	});

	return homeView;

});