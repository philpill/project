define(['backbone', 'models/title'], function(Backbone, TitleModel){

	var TitleCollection = Backbone.Collection.extend({
		model: TitleModel,
		url: '/gametitles/list',
		parse: function(response) {
			//console.log(response.titles);
			return response.titles;
		}
	});

	return TitleCollection;

});