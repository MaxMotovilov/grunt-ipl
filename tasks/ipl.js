// Copyright (C) 2014, 12 Quarters Consulting
// All rights reserved.
// Redistribution and use are permitted under the modified BSD license
// available at https://raw.githubusercontent.com/MaxMotovilov/ipl.js/master/LICENSE

var ipl = require( 'ipl' ),
	promise = require( 'node-promise' ),
	fs = require( 'fs' );

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
			else if( !(options.include instanceof Array) )
				options.include = options.include.split( /\s*[,;]\s*/ );

			var runner = ipl( options ),
				done = this.async();

			promise.all( this.files.map( protectBy( runOne, logError ), this ) )
				   .then( function( results ) {
				   		done( results.every( function(r) { return !(r instanceof Error); } ) );
				   } );

			function protectBy( a, b ) {
				return function(x) {
					return promise.whenPromise( x, a.bind(this) ).then( null, b.bind(this) ); 
				}
			}

			function runOne( f ) {
				if( f.src.length != 1 )
					throw Error( "grunt-ipl: only one source per target" );

				var type = /[.](?:js|html)$/.exec( f.src[0] );
				if( !type )
					throw Error( "grunt-ipl: cannot determine content type from " + f.src[0] );

				var	result = promise.defer(),
					output = runner( fs.createReadStream( f.src[0] ), {}, type[0] == ".js", this.args );

				output.on( 'error', result.reject.bind( result ) )
					  .once( 'readable', function() { 
						output.pipe(
							fs.createWriteStream( f.dest )
						  	  .on( 'error', result.reject.bind( result ) )
						);
					  } );

				return result;
			}

			function logError( err ) {
				grunt.log.error( 
					(err.tagname && (
						err.tagname +
						(err.filename && (
							" (" + err.filename +
							(err.line ? ' [' + err.line + ']' : "") +
							")"
						) || "") + ": "
					) || "") +
					err.stack
				);
			}
		}
	);
}
