
////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2018, ESI Group
//  All rights reserved.
//
//  Author: Perry L Miller IV
//
////////////////////////////////////////////////////////////////////////////////

/* eslint-env node */

const Clean = require ( "clean-webpack-plugin" );
const fs = require ( "fs" );
const npmConfigFile = require ( "./package.json" );
const Uglify = require ( "uglifyjs-webpack-plugin" );
const webpack = require ( "webpack" );

const command = process.env.npm_lifecycle_event;
const version = npmConfigFile.version;

let output = null;
let entry = null;
let context = null;
const plugins = [];

if ( "build" == command )
{
  output = {
    path: __dirname + "/build/",
    filename: ( npmConfigFile.name + "-" + version + ".js" ),
    library: "PropertyTools", // Makes a global object by this name.
    libraryTarget: "umd",     // Use as global object, with CommonJS, or with RequireJS.
    umdNamedDefine: true
  };

  context = __dirname + "/source",
  entry = "./main.js";
}

else if ( "build-min" == command )
{
  output = {
    path: __dirname + "/build/",
    filename: ( npmConfigFile.name + "-" + version + ".min.js" ),
    library: "PropertyTools", // Makes a global object by this name.
    libraryTarget: "umd",     // Use as global object, with CommonJS, or with RequireJS.
    umdNamedDefine: true
  };

  context = __dirname + "/source",
  entry = "./main.js";

  plugins.push ( new Uglify ( {
    sourceMap: true
  } ) );
}

else if ( "build-test" == command )
{
  output = {
    path: __dirname + "/build/",
    filename: "test.js"
  };

  context = __dirname + "/tests",
  entry = "./main.js";
}

else
{
  throw new Error ( "Unexpected npm command: " + command );
}

plugins.push ( new Clean ( [ // Make sure the tests don't run with old files.
  output.path + output.filename,
  output.path + output.filename + ".map"
], { verbose: true } ) );

let banner = fs.readFileSync ( "./source/banner.txt", { encoding: "utf8" } );
banner = banner.replace ( "[version]", npmConfigFile.version );
banner = banner.replace ( "[description]", npmConfigFile.description );
plugins.push ( new webpack.BannerPlugin ( { banner: banner, raw: true } ) );

const config = {
  mode: "development",
  entry: entry,
  context: context,
  output: output,
  resolve: { extensions: [ ".js" ] },
  stats: {
    colors: true,
    modules: true,
    reasons: true
  },
  plugins: plugins,
  devtool: "source-map"
};

console.log ( "In webpack config file: ", __filename );
console.log ( "config = \n", config );

module.exports = config;
