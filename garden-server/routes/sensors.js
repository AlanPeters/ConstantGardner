var express = require('express');
var router  = express.Router();

router.post('/', function(req, res, next) {
    console.log('--->', req.body);
    return res.json(req.body);
});

module.exports = router;
