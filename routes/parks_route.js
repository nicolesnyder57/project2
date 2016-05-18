var express = require('express');
var router = express.Router();
var parksDal = require('../model/parks_dal');


router.get('/create', function(req, res, next) {
    res.render('parkFormCreate.ejs');
});





router.get('/all', function(req, res) {
    parksDal.GetAll(function (err, result) {
            if (err) {
                res.send("Error" + err.message);
            }
            else {
                res.render('displayAllParks.ejs', {rs: result});
            }
        }
    );
});

router.get('/edit', function(req, res){
    console.log('/edit park_id:' + req.query.park_id);

    parksDal.GetByID(req.query.park_id, function(err, park_result){
        if(err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            message = 'Success';
            console.log(park_result);
                res.render('park_edit_form.ejs', {rs: park_result, message: req.query.message});
            }
        });
});





 router.get('/', function (req, res) {
     parksDal.GetByID(req.query.park_id, function (err, result) {
             if (err) throw err;

             res.render('displayParkInfo.ejs', {rs: result, park_id: req.query.park_id});
         }
     ); });


router.get('/save', function(req, res, next) {
    console.log("park_name equals: " + req.query.park_name);
    console.log("the parking_price submitted was: " + req.query.parking_price);
    console.log("the hours submitted was: " + req.query.hours);

    parksDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the Park.");
        }
    });
});


router.post('/update_park', function(req,res){
    console.log(req.body);
    parksDal.Update(req.body.park_id, req.body.park_name, req.body.parking_price, req.body.hours, req.body.dogs,
        function(err){
            var message;
            if(err) {
                console.log(err);
                message = 'error: ' + err.message;
            }
            else {
                message = 'success';

                parksDal.GetByID(req.body.park_id, function (err, park_info) {
                    res.render('park_edit_form.ejs', {rs: park_info});
                });
            }

        });
});


router.get('/delete', function(req, res){
    console.log(req.query);
    parksDal.GetByID(req.query.park_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            parksDal.DeleteById(req.query.park_id, function (err) {
                res.send(result[0].park_name + ' Successfully Deleted');
            });
        }
        else {
            res.send('Park does not exist in the database.');
        }
    });
});


module.exports = router;