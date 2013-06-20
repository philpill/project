define(['backbone'], function(Backbone){

	var TitleModel = Backbone.Model.extend({

		parse: function(response) {
			//console.log(response);
			return response;
		}
	});

	return TitleModel;

});