define(function(require){

	var Marionette = require('marionette');
	var TitleView = require('views/title');
	var TitleModel = require('models/title');
	var UserModel = require('models/user');
	var TitleCollection = require('collections/title');
	var mock = require('mock');

	function getUserModel(){
		var user = $.cookie('user');
		if (!user) {
			return null;
		}
		var userJSON = JSON.parse(user);
		var userModel = new UserModel(userJSON);
		return userModel;
	}

	var TitlesView = Marionette.CompositeView.extend({
		tagName: 'section',
		className: 'titles',
		template: '#TitlesTemplate',
		itemView: TitleView,
		events: {
			'click .delete' : 'deleteTitle',
			'click .add' : 'addTitle'
		},
		addTitle: function(e) {
			e.preventDefault();
			var title = this.$el.find('.title').val();
			var description = this.$el.find('.description').val();
			var titleModel = new TitleModel({
				name: title,
				description: description,
				id: Math.random()
			});
			var user = getUserModel();
			titleModel.url = '/profile/' + user.get('userId') + '/titles/';
			$.when(titleModel.save())
			.then((function(data){
				this.collection.add(titleModel);
			}).bind(this))
			.then((function(){
				this.reRender();
			}).bind(this));
			mock.respond();
        },
		deleteTitle: function(e) {
			e.preventDefault();
			var $currentTarget = $(e.currentTarget);
			var titleId = $currentTarget.parents('li:eq(0)').data('id');
			var title = this.collection.get(titleId);
			title.destroy();
			mock.respond();
			this.reRender();
		},
		reRender: function() {
			this.render();
			$('.titles li').append(' <a href="#" class="delete">delete</a>'); //totally the wrong place for this
			this.delegateEvents();
		},
		appendHtml: function(collectionView, itemView, index){
			collectionView.$('ol').append($(itemView.el).html());
		}
	});

	return TitlesView;

});