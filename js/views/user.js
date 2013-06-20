define(function(require){

	var Marionette = require('marionette');
	var UserModel = require('models/user');
	var Mock = require('mock');

	require('sinon');

	function getUserModel(){
		var user = $.cookie('user');
		var userJSON = JSON.parse(user);
		var userModel = new UserModel(userJSON);
		return userModel;
	}

	var UserView = Marionette.ItemView.extend({
		template: '#UserTemplate',
		events: {
			'click .save' : 'save'
		},
		save: function(e) {
			console.log('save()');
			e.preventDefault();
			var data = this.getFormValues();
			var user = getUserModel();
			var server = sinon.fakeServer.create();
			server.respondWith(Mock.profileResponse);
			$.when(user.save(data))
			.then(function(){
				console.log('saved!');
				//display success
			});
			server.respond();
		},
		getFormValues: function() {
			var data = {};

			data.username = this.$el.find('[name=username]').val();
			data.firstName = this.$el.find('[name=firstName]').val();
			data.lastName = this.$el.find('[name=lastName]').val();
			data.password = this.$el.find('[name=password]').val();
			data.phoneNumber = this.$el.find('[name=phoneNumber]').val();
			data.age = this.$el.find('[name=age]').val();
			data.genderIsFemale = (this.$el.find('[name=genderIsFemale]').val() === 'on') ? true : false;;
			data.notes = this.$el.find('[name=notes]').val();

			console.log(data);

			return data;
		}
	});

	return UserView;

});