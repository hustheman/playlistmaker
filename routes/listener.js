//var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('admin:password1@ds027759.mongolab.com:27759/heroku_app22039734', {safe:false});

exports.home = function(req, res){
	db.collection('queue').find().toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
			if (result.length == 0){
				// empty list of songs
				console.log("empty");
				res.render('listener', { title: 'Listening Device'});
			} else {
				var strtime = result[0].time;
				var time = parseInt(strtime)
				res.render('listener', { title: 'Listening Device', response: result[0].url, time: time});
				db.collection('queue').remove(result[0],function(err){
					if (!err) console.log('entry deleted!');
					db.collection('queue').find().toArray(function(err, result) {
						console.log(result);

					});
				});
			}
			
		});
	
};

