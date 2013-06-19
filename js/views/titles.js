define(['marionette', 'views/title', 'collections/title'], function(Marionette, TitleView, TitleCollection){

	var titleCollection = new TitleCollection();

	var TitlesView = Backbone.Marionette.CompositeView.extend({
		template: "#TitlesTemplate",
		tagName: 'section',
		className: 'titles',
		itemView: TitleView,
		collection: titleCollection,
		initialize: function() {
			this.collection.fetch();
		},
		appendHtml: function(collectionView, itemView, index){
			console.log(itemView.el);
			collectionView.$("dl").append($(itemView.el).html());
		}
	});

	return TitlesView;

});