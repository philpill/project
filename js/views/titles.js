define(function(require){

		var Marionette = require('marionette');
		var TitleView = require('views/title');
		var TitleCollection = require('collections/title');
		var Mock = require('mock');

		require('sinon');

	console.log(Mock);

	var server = sinon.fakeServer.create();

	var titleCollection = new TitleCollection();

	server.respondWith("GET", "/gametitles/list",
		[200, {"Content-Type": "application/json"},
		Mock.titlesResponse]);
	titleCollection.fetch();

	server.respond();

	var TitlesView = Backbone.Marionette.CompositeView.extend({
		template: "#TitlesTemplate",
		itemView: TitleView,
		collection: titleCollection,
		appendHtml: function(collectionView, itemView, index){
			collectionView.$('dl').append($(itemView.el).html());
		}
	});

	return TitlesView;

});