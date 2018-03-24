
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
//  Make sure the correct functions are exported.
//
////////////////////////////////////////////////////////////////////////////////

/* eslint-env node, mocha */

"use strict";

const {
  getProperty,
  requireProperty,
  setProperty,
  getVersion
} = require ( "../source/main" );

const { assert } = require ( "chai" );


////////////////////////////////////////////////////////////////////////////////
//
//  Start of the scope.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Export", function() {


////////////////////////////////////////////////////////////////////////////////
//
//  These functions should be exported.
//
////////////////////////////////////////////////////////////////////////////////

it ( "Should export getProperty", function()
{
  assert.ok ( "function" === ( typeof getProperty ) );
} );

it ( "Should export setProperty", function()
{
  assert.ok ( "function" === ( typeof setProperty ) );
} );

it ( "Should export requireProperty", function()
{
  assert.ok ( "function" === ( typeof requireProperty ) );
} );

it ( "Should export getVersion", function()
{
  assert.ok ( "function" === ( typeof getVersion ) );
} );


////////////////////////////////////////////////////////////////////////////////
//
//  End of the scope.
//
////////////////////////////////////////////////////////////////////////////////

} );
