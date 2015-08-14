var fs = require('fs');
var exec = require('child_process').exec;

var directory = 'data';
var socks_port = 9050;
var control_port = 15000;
var instances;

exports.start = function(instances, callback) {
	instances = instances + 1;
	fs.mkdir(directory, function () {
		for (var i = 1; i < instances; i++) {
			prepare(i, instances,callback);
		}
	});
};

var prepare = function(i, instances, callback) {
	var newdir = directory + "/tor" + i;
	fs.mkdir(newdir, function () {
		tor(i, callback);
	});
};



var tor = function(i, callback) {
	var torquery = "tor --RunAsDaemon 1 --CookieAuthentication 0 --HashedControlPassword \"\" --ControlPort " + (control_port + i) + " --PidFile tor" + i + ".pid --SocksPort " + (socks_port + i) + " --DataDirectory " + directory + "/tor" + i;
	var query = exec(torquery, function (error, stdout, stderr) {
		if (error) {
			error = stdout;
		}
		callback(error, i, socks_port+i, control_port+i, instances);
	});
};
