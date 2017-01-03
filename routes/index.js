var express = require('express');
var databaseService = require('../service/database-service')
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('pages/index', {
    title: 'LevelDB Demo.',
    description: 'This is a site using Vue.js with webpack'
  });
});

router.get('/database', function (req, res, next) {
  res.render('pages/database', {
    title: 'LevelDB Demo.',
    description: 'This is a site using Vue.js with webpack'
  });
});

router.get('/database/getMetaDatabase', function(req, res, next){
  databaseService.getMetaDatabase(req, res, next)
});

router.post('/database/addDatabase', function(req, res, next){
  databaseService.addDatabase(req, res, next)
});

module.exports = router;
