var pjson = require('../package.json');
var changelogjson = require('../changelog.json');
var os = require("os");

module.exports.display = function(req,res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.charset = 'UTF-8';
	var display = 'End point of "'+pjson.name+'" application version '+pjson.version+"\n\n";
	display += 'Methods : \n';
	for(var i=0;i<esRoutesConf.length;i++){
		display += ' - ' + esRoutesConf.name + ':' + os.hostname() + esRoutesConf.path + "\n";
	}
	for (var i=0; i< changelogjson.length; i++){
		display += 'Version '+changelogjson[i].version+' ('+changelogjson[i].date+') : '+changelogjson[i].comment + "\n";
		display += "---\n";
	}
	res.send(display);
	res.end("");
};