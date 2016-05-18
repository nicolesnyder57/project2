var express = require('express');
var router = express.Router();
var hikesDal = require('../model/hikes_dal');
var parksDal = require('../model/parks_dal');


router.get('/create', function(req, res, next) {
    res.render('hikeFormCreate.ejs');
});



router.get('/save', function(req, res, next) {
    console.log("trail_name equals: " + req.query.trail_name);

    hikesDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the Hiking Trail.");
        }
    });
});

router.get('/new', function(req, res) {
    parksDal.GetAll( function(err, result){
        if(err) {
            res.send("Error: " + err);
        }
        else {
            res.render('hike_insert_form.ejs', {p: result});
        }
    });

});



router.get('/all', function(req, res) {
    hikesDal.GetAll(function (err, result) {
            if (err) {
                res.send("Error" + err.message);
            }
            else {
                res.render('displayAllHikes.ejs', {rs: result});
            }
        }
    );
});

router.get('/', function (req, res) {
    hikesDal.GetByID(req.query.hiking_trail_id, function (err, result) {
            if (err) throw err;

            res.render('displayHikeInfo.ejs', {rs: result, hiking_trail_id: req.query.hiking_trail_id});
        }
    ); });



router.post('/insert_hike', function(req, res) {
    console.log(req.body);

    hikesDal.Insert(req.body,
        function(err){
            if(err){
                res.send('Fail!<br />' + err);
            } else {
                res.send('Success!')
            }
        });


});

router.post('/update_hike', function(req,res){
    console.log(req.body);
    hikesDal.Update(req.body.hiking_trail_id, req.body.trail_name, req.body.mileage, req.body.level_of_dificilty, req.body.elavation_level,
        function(err){
            var message;
            if(err) {
                console.log(err);
                message = 'error: ' + err.message;
            }
            else {
                message = 'success';

                hikesDal.GetByID(req.body.hiking_trail_id, function (err, park_info) {
                    res.render('hike_edit_form.ejs', {rs: park_info});
                });
            }

        });
});


router.get('/delete', function(req, res){
    console.log(req.query);
    hikesDal.GetByID(req.query.hiking_trail_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            hikesDal.DeleteById(req.query.hiking_trail_id, function (err) {
                res.send(result[0].trail_name + ' Successfully Deleted');
            });
        }
        else {
            res.send('Hiking Trail does not exist in the database.');
        }
    });
});



router.get('/edit', function(req, res){
    console.log('/edit hiking_trail_id:' + req.query.hiking_trail_id);

    hikesDal.GetByID(req.query.hiking_trail_id, function(err, hike_result){
        if(err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            message = 'Success';
            console.log(hike_result);
            res.render('hike_edit_form.ejs', {rs: hike_result, message: req.query.message});
        }
    });
});
module.exports = router;