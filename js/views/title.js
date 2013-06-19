define(['marionette'], function(Marionette){

	var TitleView = Marionette.ItemView.extend({
		template: '#TitleTemplate'
	});

	return TitleView;

});