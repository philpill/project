require.config({
	baseUrl: 'js',
	paths: {
		backbone: 'external/backbone-min',
		underscore: 'external/underscore-min',
		jquery: 'external/jquery-2.0.2.min',
		cookie: 'external/jquery.cookie',
		json2: 'external/json2',
		bootstrap: 'external/bootstrap.min',
		marionette: 'external/backbone.marionette.min',
		babysitter: 'external/backbone.babysitter',
		wreqr: 'external/backbone.wreqr',
		sinon: 'external/sinon-1.7.1'
	},
	waitSeconds: 5,
	shim: {
		cookie: {
			deps: ['jquery']
		},
		json2: {
			exports: 'JSON'
		},
		backbone: {
			deps: ['underscore', 'jquery', 'json2'],
			exports: 'Backbone'
		},
		underscore: {
			exports: '_'
		},
		bootstrap: {
		deps: ['jquery']
		},
		babysitter: {
		deps: ['backbone']
		},
		wreqr: {
		deps: ['backbone']
		},
		marionette: {
			deps: ['backbone', 'babysitter', 'wreqr'],
			exports: 'Marionette'
		},
		sinon: {
			exports: 'Sinon'
		}
	}
});

require( ['sony'], function(Sony){
	Sony.start();
});