var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on things.');
});
router.post('/', function(req, res){
   res.send('POST route on things.');
});

// router.get('/:id', function(req, res) {
//    res.send('The id you specified is ' + req.params.id);
// });

router.get('/tutorials1', function(req, res) {
   res.send('tutorials1 are here ');
});

router.get('/tutorials2', function(req, res) {
   res.send('tutorials2 are here ');
});

//export this router to use in our index.js
module.exports = router;