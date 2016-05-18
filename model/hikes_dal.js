var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM hiking_trails;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}



exports.Update = function(hiking_trail_id, trail_name, mileage, level_of_dificulty, elevation_level,  callback) {
    console.log(hiking_trail_id, trail_name, mileage, level_of_dificulty, elevation_level);
    var values = [trail_name, mileage, level_of_dificulty, elevation_level, hiking_trail_id];

    connection.query('UPDATE hiking_trails SET trail_name = ?, mileage = ?, level_of_dificulty = ?, ' +
        'elevation_level = ? WHERE hiking_trail_id = ?', values,
        function(err, result){
            callback(err, null);
        });
}


exports.GetByID = function(hiking_trail_id, callback) {
    console.log(hiking_trail_id);
    var query = 'SELECT * FROM hike_info_view WHERE hiking_trail_id=' + hiking_trail_id;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}




exports.Insert = function(account_info, callback) {
    console.log(account_info);
    var dynamic_query = 'INSERT INTO hiking_trails (trail_name, mileage, level_of_dificulty, elevation_level, park_id) VALUES (' +
        '\'' + account_info.trail_name + '\', ' +
        '\'' + account_info.mileage + '\', ' +
        '\'' + account_info.level_of_dificulty + '\', ' +
        '\'' + account_info.elevation_level + '\', ' +
        '\'' + account_info.park_id + '\'' +
        ');';


    console.log("test");
    console.log(dynamic_query);

    connection.query(dynamic_query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

var Delete = function(hiking_trail_id, callback) {
    var qry = 'DELETE FROM hiking_trails WHERE hiking_trail_id = ?';
    connection.query(qry, [hiking_trail_id],
        function (err) {
            callback(err);
        });
}

exports.DeleteById = Delete;
