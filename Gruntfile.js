/*
 * grunt-cssurlrev
 * https://github.com/richardbolt/grunt-cssurlrev
 *
 * Copyright (c) 2013 Richard Bolt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    copy: {
      tests: {
        files: { 
          'tmp/default.css':  'test/fixtures/test.css',
          'tmp/custom.css':   'test/fixtures/test.css',
          'tmp/hashmap.css':   'test/fixtures/test.css',
          'tmp/prefix.css':   'test/fixtures/test.css',
        }
      }
    },

    // Configuration to be run (and then tested).
    cssurlrev: {
      default_options: {
        src: 'tmp/default.css'
      },
      custom_options: {
        options: {
          assets: 'test/fixtures/assets.json'
        },
        src: 'tmp/custom.css'
      },
      hashmap_mode: {
        options: {
          assets: 'test/fixtures/hashmap.json',
          hashmap_rename: '#{= dirname}/#{= hash}.#{= basename}#{= extname}'
        },
        src: 'tmp/hashmap.css'
      },
      prefix_mode: {
        options: {
          prefix: 'dist/'
        },
        src: 'tmp/prefix.css'
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Load the fixtures into the object that filerev_assets expects.
  grunt.registerTask('filerev_setup', 'Mock grunt.filerev.summary', function(){
    grunt.filerev = grunt.file.readJSON('test/fixtures/filerev.json');
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'filerev_setup', 'cssurlrev', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
