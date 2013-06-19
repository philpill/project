define([
	'marionette',
	'views/title',
	'collections/title',
	'sinon',
	'mock'
	], function(Marionette, TitleView, TitleCollection, undefined, Mock){

	console.log(Mock);

	var titleCollection = new TitleCollection();

	var server = sinon.fakeServer.create();

	var TitlesView = Backbone.Marionette.CompositeView.extend({
		template: "#TitlesTemplate",
		tagName: 'section',
		className: 'titles',
		itemView: TitleView,
		collection: titleCollection,
		initialize: function() {

			server.respondWith("GET", "/gametitles/list",
				[200, {"Content-Type": "application/json"},
				Mock.titlesResponse]);

			this.collection.fetch();

			server.respond();

			server.restore();
		},
		appendHtml: function(collectionView, itemView, index){
			collectionView.$("dl").append($(itemView.el).html());
		}
	});

	return TitlesView;

});