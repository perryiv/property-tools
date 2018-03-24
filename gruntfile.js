
////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2018, ESI Group
//  All rights reserved.
//
//  Author: Perry L Miller IV
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//
//  Grunt configuration file. See:
//
//  http://24ways.org/2013/grunt-is-not-weird-and-hard/
//  http://www.brianchu.com/blog/2013/07/11/grunt-by-example-a-tutorial-for-javascripts-task-runner/
//  https://stackoverflow.com/questions/13358680/how-to-config-grunt-js-to-minify-files-separately
//
////////////////////////////////////////////////////////////////////////////////

/* eslint-env node */

module.exports = function ( grunt )
{
  // Get the scripts defined in the npm config file.
  var npmConfigFile = require ( "./package.json" );
  var scripts = npmConfigFile.scripts;

  // Initialize all the scripts we can run.
  var commands = {};
  for ( var key in scripts )
  {
    commands[key] = { cmd: "npm", args: [ "run", key ] };
  }

  // The tasks to run.
  var tasks = [
    "run:lint",
    "run:build",
    "run:build-min",
    "run:build-test",
    "run:test"
  ];

  // All configuration goes here
  var config = {

    // The arbitrary commands to run, defined above.
    run: commands,

    // Configure what files to watch, and what to do when they change.
    watch: {

      // When any of the files change we reload any pages in the browser
      // that are using the LiveReload extension.
      options: { livereload: {
        host: "localhost",
        port: 35742 // Matches port in tests/index.html
      } },

      // The scripts are a combination of the files to watch and the
      // comands to run when they change.
      scripts: {

        // The files to watch.
        files: [

          // Configuration files.
          "gruntfile.js",
          "ReadMe.md",
          "package.json",
          "webpack.config.js",
          ".eslintrc.js",

          // Source code.
          "source/**/*.js",
          "source/banner.txt",
          "tests/index.html",
          "tests/**/*.js"
        ],

        // Do these tasks when a file changes.
        tasks: tasks,

        // Do not spawn a child process to run the tasks.
        options: { spawn: false }
      }
    }
  };

  // All configuration goes here
  grunt.initConfig ( config );

  // Tell grunt we plan to use these plug-ins.
  grunt.loadNpmTasks ( "grunt-run" );
  grunt.loadNpmTasks ( "grunt-contrib-watch" );
};
