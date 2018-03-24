
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
//  Test the function for getting the version.
//
////////////////////////////////////////////////////////////////////////////////

/* eslint-env node, mocha */

"use strict";

const { getVersion } = require ( "../source/main" );
const { version } = require ( "../package.json" );

const { assert } = require ( "chai" );


////////////////////////////////////////////////////////////////////////////////
//
//  Start of the scope.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Version", function() {


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

it ( "The version should be correct", function()
{
  const major = 1;
  const minor = 0;
  const patch = 0;

  // Test the function.
  assert.deepEqual ( getVersion(), { major: major, minor: minor, patch: patch } );

  // Make sure we're consistent with the package.
  assert.deepEqual ( version, ( major + "." + minor + "." + patch ) );
} );


////////////////////////////////////////////////////////////////////////////////
//
//  End of the scope.
//
////////////////////////////////////////////////////////////////////////////////

} );