define(function(require){

	var Marionette = require('marionette');
	var TitleView = require('views/title');
	var TitleCollection = require('collections/title');
	var Mock = require('mock');

	require('sinon');

	var TitlesView = Marionette.CompositeView.extend({
		template: "#TitlesTemplate",
		itemView: TitleView,
		events: {
			'click .delete' : 'deleteTitle'
		},
		initialize: function() {

        },
		deleteTitle: function(e) {
			console.log('deleteTitle()');
			e.preventDefault();
			var $currentTarget = $(e.currentTarget);
			var titleId = $currentTarget.parents('dt:eq(0)').data('id');
			var title = this.collection.get(titleId);
			this.collection.remove(title);
			this.render()
		},
		appendHtml: function(collectionView, itemView, index){
			collectionView.$('dl').append($(itemView.el).html());
		}
	});

	return TitlesView;

});