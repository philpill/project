define(['backbone', 'models/title'], function(Backbone, TitleModel){

	var TitleCollection = Backbone.Collection.extend({
  		model: TitleModel
	});

	return TitleCollection;

});