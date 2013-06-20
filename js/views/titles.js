define(function(require){

	var Marionette = require('marionette');
	var TitleView = require('views/title');
	var TitleCollection = require('collections/title');
	var Mock = require('mock');

	require('sinon');

	var TitlesView = Marionette.CompositeView.extend({
		template: "#TitlesTemplate",
		itemView: TitleView,
		appendHtml: function(collectionView, itemView, index){
			collectionView.$('dl').append($(itemView.el).html());
		}
	});

	return TitlesView;

});