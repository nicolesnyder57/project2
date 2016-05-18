var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);





exports.GetAll = function(callback) {
    connection.query('SELECT * FROM parks;',
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





 exports.GetByID = function(park_id, callback) {
     console.log(park_id);
     var query = 'SELECT * FROM park_info_view WHERE park_id=' + park_id;
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
    var dynamic_query = 'INSERT INTO parks (park_name, parking_price, dogs, hours) VALUES (' +
        '\'' + account_info.park_name + '\', ' +
        '\'' + account_info.parking_price + '\', ' +
        '\'' + account_info.dogs + '\', ' +
        '\'' + account_info.hours + '\'' +
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






exports.Update = function(park_id, park_name, parking_price, hours, dogs, callback) {
    console.log(park_id, park_name, parking_price, hours, dogs);
    var values = [park_name, parking_price, hours, dogs, park_id];

    connection.query('UPDATE parks SET park_name = ?, parking_price = ?, hours = ?, ' +
        'dogs = ? WHERE park_id = ?', values,
        function(err, result){
                callback(err, null);
        });
}





var Delete = function(park_id, callback) {
    var qry = 'DELETE FROM parks WHERE park_id = ?';
    connection.query(qry, [park_id],
        function (err) {
            callback(err);
        });
}

exports.DeleteById = Delete;