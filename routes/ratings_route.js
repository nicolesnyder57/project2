var express = require('express');
var router = express.Router();
var ratingsDal = require('../model/ratings_dal');
var parksDal = require('../model/parks_dal');


router.get('/create', function(req, res, next) {
    res.render('ratingFormCreate.ejs');
});





router.get('/all', function(req, res) {
    ratingsDal.GetByID(req.query, function (err, result) {
                if (err) {
                    res.send("Error" + err.message);
                }
                else {
                        res.render('displayAllRatings.ejs', {rs: result});
                }
                });
});


router.get('/new', function(req, res) {
    parksDal.GetAll( function(err, result){
        if(err) {
            res.send("Error: " + err);
        }
        else {
            res.render('rating_insert_form.ejs', {p: result});
        }
    });

});



router.get('/', function (req, res) {
    ratingsDal.GetByID(req.query.rating_id, function (err, result) {
            if (err) throw err;

            res.render('displayRatingInfo.ejs', {rs: result, rating_id: req.query.rating_id});
        }
    ); });



router.post('/insert_rating', function(req, res) {
    console.log(req.body);

    ratingsDal.Insert(req.body,
        function(err){
            if(err){
                res.send('Fail!<br />' + err);
            } else {
                res.send('Success!')
            }
        });


});

module.exports = router;