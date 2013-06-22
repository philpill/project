define(['backbone', 'models/title'], function(Backbone, TitleModel){

	var TitleCollection = Backbone.Collection.extend({
		model: TitleModel,
		url: '/gametitles/list',
		parse: function(response) {
			return response.titles;
		}
	});

	return TitleCollection;

});