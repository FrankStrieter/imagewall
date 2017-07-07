var express = require('express');
var router = express.Router();
var request = require('request-promise');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.status(200).json({users: [{name: 'Timmy'}]});
});

module.exports = router;
