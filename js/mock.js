define(function(require){

	var deleteUserTitles = require('text!../data/deleteUserTitles.json');
	var getUserTitlesResponse = require('text!../data/getUserTitlesResponse.json');
	var profileResponse = require('text!../data/profileResponse.json');
	var putUserTitles = require('text!../data/putUserTitles.json');
	var registerResponse = require('text!../data/registerResponse.json');
	var signinResponse = require('text!../data/signinResponse.json');
	var titlesResponse = require('text!../data/titlesResponse.json');

	var Mock = {
		deleteUserTitles: deleteUserTitles,
		getUserTitlesResponse: getUserTitlesResponse,
		profileResponse: profileResponse,
		putUserTitles: putUserTitles,
		registerResponse: registerResponse,
		signinResponse: signinResponse,
		titlesResponse: titlesResponse
	};

	return Mock;

});