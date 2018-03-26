
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

const { getVersion } = require ( "./entry" );
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
  // Get the version as separate numbers.
  const va = version.split ( "." );
  const major = parseInt ( va[0] );
  const minor = parseInt ( va[1] );
  const patch = parseInt ( va[2] );

  // Make sure they are numbers.
  assert.ok ( "number" === ( typeof major ) );
  assert.ok ( "number" === ( typeof minor ) );
  assert.ok ( "number" === ( typeof patch ) );

  // Make sure they are not negative numbers.
  assert.ok ( major >= 0 );
  assert.ok ( minor >= 0 );
  assert.ok ( patch >= 0 );

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
