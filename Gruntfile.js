// Copyright (C) 2014, 12 Quarters Consulting
// All rights reserved.
// Redistribution and use are permitted under the modified BSD license
// available at https://raw.githubusercontent.com/MaxMotovilov/ipl.js/master/LICENSE

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Before generating any new files, remove any previously-created files.
    clean: {
		tests: ['tmp/*'],
    },

    // Configuration to be run (and then tested).
    ipl: {
		test: {
			options: { 
				include: "node_modules/ipl/test/include" 
			},
			files: [ {
				expand: true,
				flatten: true,
				src:	"node_modules/ipl/test/in/*",
				dest:	"tmp/"
			} ]
		}
	},

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'ipl', 'nodeunit']);
  grunt.registerTask('default', ['test']);
};
