var express = require('express');
var router = express.Router();
var campDal = require('../model/camp_dal');
var parksDal = require('../model/parks_dal');




router.get('/all', function(req, res) {
    campDal.GetAll(function (err, result) {
            if (err) {
                res.send("Error" + err.message);
            }
            else {
                res.render('displayAllCampsites.ejs', {rs: result});
            }
        }
    );
});

router.get('/', function (req, res) {
    campDal.GetByID(req.query.campsite_id, function (err, result) {
            if (err) throw err;

            res.render('displayCampsiteInfo.ejs', {rs: result, campsite_id: req.query.campsite_id});
        }
    ); });

module.exports = router;