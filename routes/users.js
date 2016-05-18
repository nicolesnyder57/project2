var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    parksDal.GetAll(req.query.park_id, function (err, result) {
            if (err) throw err;

            res.render('displayAllParks.ejs', {rs: result, user_id: req.query.park_id});
        }
    );
});
module.exports = router;
