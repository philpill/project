define(function(require){

	var templates = [];
	templates.push(require('text!../templates/about.html'));
	templates.push(require('text!../templates/authentication.html'));
	templates.push(require('text!../templates/home.html'));
	templates.push(require('text!../templates/login.html'));
	templates.push(require('text!../templates/title.html'));
	templates.push(require('text!../templates/titles.html'));
	templates.push(require('text!../templates/user.html'));
	templates.push(require('text!../templates/userTitles.html'));

	var template = {
		load: function() {
			var $body = $('body');
			for (var i = 0;i<templates.length;i++) {
				$(templates[i]).appendTo($body);
			}
		}
	};

	return template;

});