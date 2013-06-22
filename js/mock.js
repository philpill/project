define(function(require){

	require('sinon');

	var deleteUserTitles = require('text!../data/deleteUserTitles.json');
	var getUserTitlesResponse = require('text!../data/getUserTitlesResponse.json');
	var profileResponse = require('text!../data/profileResponse.json');
	var putUserTitles = require('text!../data/putUserTitles.json');
	var registerResponse = require('text!../data/registerResponse.json');
	var signinResponse = require('text!../data/signinResponse.json');
	var titlesResponse = require('text!../data/titlesResponse.json');

	var server = sinon.fakeServer.create();

	server.respondWith('GET', '/profile/c778e312-b18a-4436-8757-2f46f84c8243',
		[200, {'Content-Type': 'application/json'}, profileResponse]);

	server.respondWith('GET', '/signin/alexw/0777999666',
		[200, {'Content-Type': 'application/json'}, signinResponse]);

	server.respondWith('GET', /^\/signin\/(alexw\/0777999666)$/,
		[403, {'Content-Type': 'application/json'}, '']);

	server.respondWith('GET', /\/profile\/.+\/titles/,
		[200, {'Content-Type': 'application/json'}, getUserTitlesResponse]);

	server.respondWith('PUT', /\/profile\/.+\/titles/,
		[200, {'Content-Type': 'application/json'}, putUserTitles]);

	server.respondWith('DELETE', /\/profile\/.+\/titles/,
		[200, {'Content-Type': 'application/json'}, deleteUserTitles]);

	server.respondWith('GET', '/gametitles/list',
		[200, {'Content-Type': 'application/json'}, titlesResponse]);

	server.respondWith('POST', '/profile',
		[200, {'Content-Type': 'application/json'}, registerResponse]);

	return server;

});