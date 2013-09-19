RestES
======

RestES is nodejs server that makes ElasticSearch queries available from a full REST API
This aims to be generic and simple : one can add a new api method with parameters, and maps it with an ElasticSearch query, from a single conf file.

Development repo is here: http://github.com/pagesjaunes/RestES

Note that "RestES" stands for Rest ElasticSearch

Description
====

RestES aims to add a Rest API layer on an ElasticSearch index. This is built to make this layer as flexible and easy to configure as possible.
With RestES you have only to declare a route and a matching elasticsearch query in the esroutes.json file.

Example of esroutes.json file :
`[
  {
  "name":"getMovieByTitle",
  "path":"/getMovieByTitle/:title",
  "esQuery":{
    "query":{
      "field":{
        "title":"@title@"
      }
    }
  }
  }
]`
   
This make the http://localhost/getMovieByTitle/BatMan url available.
It returns a json document of the "movies" elasticsearch index, that owns a "title" field with "BatMan" as a value.

Installation
====

- Get the archive of the application
- Unpack it
- Edit the files :
  - conf/conf.json (port : the app will listen on the set value; es : the app will query the elasticsearch set here)
  - conf/esRoutes.conf (each object of the json array contains a map between a "route" and a "query". Add your routes (parameters must begins with the ":" caracter), and the matching elasticsearch query (route parameters can be called, they have to be boxed with two "@" caracter))

Run
====

- Launch the app with node (for instance : > node app.js)
 
