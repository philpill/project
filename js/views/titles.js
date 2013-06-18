define(['marionette', 'views/title'], function(Marionette, TitleView){

	var TitlesView = Backbone.Marionette.CompositeView.extend({
		template: "#TitlesTemplate",
		tagName: 'ul',
		className: 'titles',
		itemView: TitleView,
		appendHtml: function(collectionView, itemView){
			collectionView.append(itemView.el);
		}
	});

	return TitlesView;

});