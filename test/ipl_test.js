// Copyright (C) 2014, 12 Quarters Consulting
// All rights reserved.
// Redistribution and use are permitted under the modified BSD license
// available at https://raw.githubusercontent.com/MaxMotovilov/ipl.js/master/LICENSE

'use strict';

var grunt = require('grunt'),
	path = require( 'path' ),

	cwd = path.join( __dirname, "../node_modules/test" );

exports.ipl = {
	test: function( test ) {
		var inputs = grunt.file.expand( path.join( cwd, "in/*" ) );
		test.expect( 3 * inputs.length );

		inputs.forEach( function( input ) {
			var gauge = path.join( path.dirname( input ), "../out", path.basename( input ) ),
				output = path.join( __dirname, "../tmp", path.basename( input ) );

			test.ok( grunt.file.exists( gauge ), "BUG -- " + gauge + " should be present" );
			test.ok( grunt.file.exists( output ), output + "should be present" );
			test.equal(
				grunt.file.read( output ),
				grunt.file.read( gauge ),
				gauge + " and " + output + " should be identical"
			);
		} );

		test.done();
	}
}	

