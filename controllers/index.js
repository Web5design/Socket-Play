var models = require('../models'),
	Score = models.Score;

exports.index = function(req, res){
	res.render('index', {
		title: '',
		slug: 'game'
	});
};

exports.controller = function(req, res) {
	res.render('controller',{
		title : 'Controller',
		slug: 'controller'
	});
}