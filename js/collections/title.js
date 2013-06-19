define(['backbone', 'models/title'], function(Backbone, TitleModel){

	var TitleCollection = Backbone.Collection.extend({
		model: TitleModel,
		url: 'data/listTitles.json',
		parse: function(response) {
			return response.titles;
		}
	});

	return TitleCollection;

});