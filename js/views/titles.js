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
		deleteTitle: function(e) {
			console.log('deleteTitle()');
			e.preventDefault();
			var $currentTarget = $(e.currentTarget);
			var titleId = $currentTarget.parents('dt:eq(0)').data('id');
			console.log(titleId);
			console.log(this.collection);

			var title = this.collection.get(titleId)
			console.log(title);

			this.collection.remove(title);
			console.log(this.collection);
		},
		appendHtml: function(collectionView, itemView, index){
			collectionView.$('dl').append($(itemView.el).html());
		}
	});

	return TitlesView;

});