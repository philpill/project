define(function(require){

	var Marionette = require('marionette');
	var TitleView = require('views/title');
	var TitleModel = require('models/title');
	var UserModel = require('models/user');
	var TitleCollection = require('collections/title');
	var Mock = require('mock');

	require('sinon');

	function getUserModel(){
		var user = $.cookie('user');
		var userJSON = JSON.parse(user);
		var userModel = new UserModel(userJSON);
		return userModel;
	}

	var TitlesView = Marionette.CompositeView.extend({
		template: "#TitlesTemplate",
		itemView: TitleView,
		events: {
			'click .delete' : 'deleteTitle',
			'click .add' : 'addTitle'
		},
		addTitle: function(e) {
			console.log('addTitle()');
			e.preventDefault();

			var title = this.$el.find('.title').val();
			var description = this.$el.find('.description').val();

			console.log(title);
			console.log(description);

			var titleModel = new TitleModel({
				name: title,
				description: description,
				id: Math.random()
			});

			var user = getUserModel();

			titleModel.url = '/profile/' + user.get('userId') + '/titles/';
			var server = sinon.fakeServer.create();
			server.respondWith(Mock.putUserTitles);

			$.when(titleModel.save())
			.then((function(data){
				this.collection.add(titleModel);

			}).bind(this))
			.then((function(){
				this.reRender();
			}).bind(this));
			server.respond();
        },
		deleteTitle: function(e) {
			console.log('deleteTitle()');
			e.preventDefault();
			var $currentTarget = $(e.currentTarget);
			var titleId = $currentTarget.parents('dt:eq(0)').data('id');
			var title = this.collection.get(titleId);
			var server = sinon.fakeServer.create();
			server.respondWith(Mock.deleteUserTitles);
			title.destroy();
			server.respond();
			this.reRender();
		},
		reRender: function() {
			this.render();
			$('.titles dt').append(' <a href="#" class="delete">delete</a>'); //totally the wrong place for this
		},
		appendHtml: function(collectionView, itemView, index){
			collectionView.$('dl').append($(itemView.el).html());
		}
	});

	return TitlesView;

});