// Copyright (C) 2014, 12 Quarters Consulting
// All rights reserved.
// Redistribution and use are permitted under the modified BSD license
// available at https://raw.githubusercontent.com/MaxMotovilov/ipl.js/master/LICENSE

var ipl = require( 'ipl' ),
	promise = require( 'node-promise' );

'use strict';

module.exports = function(grunt) {

  	grunt.registerMultiTask( 'ipl', 'Grunt binding for ipl.js', 
  		function() {
			var options = this.options( {
			  	include: 	[],
			  	dontRun: 	false,
			  	env: 		{}, 
			} );

			if( !options.include )
				delete options.include;
			else if( !(options include instanceof Array) )
				options.include = options.include.split( /\s*[,;]\s*/ );

			var runner = ipl( options ),
				done = this.async();

			promise.all( this.files.map( runOne, this ) )
				   .then( function( results ) {
				   		done( results.all( function(r) { return !(r instanceof Error); } ) );
				   } );

			function runOne( f ) {
				
			}

	this.files.forEach(function( f ) {
	  // Concat specified files.
	  var src = f.src.filter(function(filepath) {
		// Warn on and remove invalid source files (if nonull was set).
		if (!grunt.file.exists(filepath)) {
		  grunt.log.warn('Source file "' + filepath + '" not found.');
		  return false;
		} else {
		  return true;
		}
	  }).map(function(filepath) {
		// Read file source.
		return grunt.file.read(filepath);
	  }).join(grunt.util.normalizelf(options.separator));

	  // Handle options.
	  src += options.punctuation;

	  // Write the destination file.
	  grunt.file.write(f.dest, src);

	  // Print a success message.
	  grunt.log.writeln('File "' + f.dest + '" created.');
	});
  });

};
