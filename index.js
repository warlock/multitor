var fs = require('fs');
var exec = require('child_process').exec;

var directory = 'data';
var socks_port = 9050;
var control_port = 15000;
var instances;

exports.start = function(instances, callback) {
	fs.exists(directory, function (exists) {
		if (!exists) {
			fs.mkdir(directory, function () {
				prepare(instances,callback);
			});
		} else {
			prepare(instances,callback);
		}
	});
};

var prepare = function(instances, callback) {
	for (var i = 0;i<instances;i++) {
		var newdir = directory + "/tor" + i;
		fs.exists(newdir, function (exists) {
			if (!exists) {
				fs.mkdir(newdir, function () {
					tor(i, callback);
				});
			} else {
				tor(i, callback);
			}
		});
	};
};


var tor = function(i, callback) {
	var torquery = "tor --RunAsDaemon 1 --CookieAuthentication 0 --HashedControlPassword \"\" --ControlPort " + (control_port + i) + " --PidFile tor" + i + ".pid --SocksPort " + (socks_port + i) + " --DataDirectory " + directory + "/tor" + i;
	var query = exec(torquery, function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}

		if ( i === instances ) {
			callback();
		}
	});
}
