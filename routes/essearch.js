module.exports.search = function(req, res, next) {

	// Replace args "@arg@" by req.params.arg so as to let evaluation possible
	// This operation requires the json object to be transform to a string
	var query = JSON.stringify(req.app.get(req.route.path));
    query = query.replace('"@', "req.params."); 
    query = query.replace('@"', ""); 
    
    // eval creates the json object from the string
	es.search(eval('('+query+')'),
		function(err, data) {
		res.setHeader('Content-Type', 'text/plain');
		res.charset = 'UTF-8';

		// Structure results
		var hits = data.hits.total;
		var facets = data.facets;
		var results = new Array();
		for (var i=0; i< data.hits.hits.length; i++){
			results[i] = data.hits.hits[i]._source; 
		}

		var reponse = new Object();
		reponse.results = results;
		reponse.total = hits;
		reponse.facets = facets;

		res.send(reponse);
		res.end("");
	});

};