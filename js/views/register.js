define(function(require){

	var Marionette = require('marionette');
	var UserModel = require('models/user');
	var mock = require('mock');

	require('bootstrap');

	var RegisterView = Marionette.ItemView.extend({
		template: '#UserTemplate',
		events: {
			'click .save' : 'save'
		},
		save: function(e) {
			e.preventDefault();
			var data = this.getFormValues();
			var user = new UserModel();
			$.when(user.save(data))
			.then(function(data){
				$('.alert.create').show().alert();
				window.scrollTo(0, 0);
			});
			mock.respond();
		},
		getFormValues: function() {
			var data = {};
			data.username = this.$el.find('[name=username]').val();
			data.firstName = this.$el.find('[name=firstName]').val();
			data.lastName = this.$el.find('[name=lastName]').val();
			data.password = this.$el.find('[name=password]').val();
			data.phoneNumber = this.$el.find('[name=phoneNumber]').val();
			data.age = this.$el.find('[name=age]').val();
			data.genderIsFemale = (this.$el.find('[name=genderIsFemale]').val() === 'on') ? true : false;
			data.notes = this.$el.find('[name=notes]').val();
			return data;
		}
	});

	return RegisterView;

});