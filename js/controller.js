define(function(require) {


	var controller = {

		listTitles: function() {
			console.log('listTitles()');

			var Sony = require('sony');
			var TitlesView = require('views/titles');
			var titlesView = new TitlesView();
			Sony.mainRegion.show(titlesView);
		}
	};

	return controller;

});