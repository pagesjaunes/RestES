/**
 * RestES
 * Get elasticsearch query responses from simple routes
 */

// Expressjs include
var express = require('express');

// Express Application declaration
var app = express();

// Conf loading
var conf = require('./conf/conf.json');

// '/' Route module
var root = require ('./routes/root');
app.get('/',root.display);

// elasticsearch client declaration
var elasticsearch = require('elasticsearch');
var config = {
	_index : conf.es.index,
	server : {
		host : conf.es.server,
		port : conf.es.port
	}
};

// es variable requires to be declared as global so as to being
// access from routes and modules
// TODO : an other way to share this ?
es = elasticsearch.createClient(config);

// Route configuration load
esRoutesConf = require('./conf/esroutes.json');
var esSearch = require ('./routes/essearch');

for(var i=0;i<esRoutesConf.length;i++){
	// Set app variables to pass extra parameters to the esSearch.search method.
	// TODO : an other way to passe extra parameters to the callback.
	app.set(esRoutesConf[i].path,esRoutesConf[i].esQuery);
	app.get(esRoutesConf[i].path,esSearch.search);
}

// Listening port defined in conf file
app.listen(conf.port);
