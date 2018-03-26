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
//  Test the function for getting a property.
//
////////////////////////////////////////////////////////////////////////////////

/* eslint-env node, mocha */

"use strict";

const { getSpeedTestConfig } = require ( "./helpers" );
const { getProperty } = require ( "./entry" );

const { assert, expect } = require ( "chai" );


////////////////////////////////////////////////////////////////////////////////
//
//  Start of the scope.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Get", function() {


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Should work when ...", function()
{
  it ( "Getting shallow properties that exist", function()
  {
    const a = { b: 1, c: "hi", d: { e: 10 } };
    assert.strictEqual ( getProperty ( a, "b" ), 1 );
    assert.strictEqual ( getProperty ( a, "c" ), "hi" );
    assert.deepEqual ( getProperty ( a, "d" ), { e: 10 } );

    const b = [ 1, "b", { c: 2 } ];
    assert.strictEqual ( getProperty ( b, 0 ), 1 );
    assert.strictEqual ( getProperty ( b, 1 ), "b" );
    assert.deepEqual ( getProperty ( b, 2 ), { c: 2 } );

    if ( "undefined" !== ( typeof MouseEvent ) ) // Do not test on node.
    {
      const m = new MouseEvent ( "test" );
      assert.strictEqual ( getProperty ( m, "clientX" ), 0 );
    }
  } );

  it ( "Getting deep properties that exist", function()
  {
    const a = { b: 1, c: { d: { e: 10 } } };
    assert.deepEqual ( getProperty ( a, [ "c", "d", "e" ] ), 10 );
    assert.deepEqual ( getProperty ( a.c, [ "d", "e" ] ), 10 );
    assert.deepEqual ( getProperty ( a, [ "c", "d" ] ), { e: 10 } );
  } );

  it ( "Getting shallow properties that do not exist", function()
  {
    const a = { b: 1 };
    assert.strictEqual ( getProperty ( a, "c" ), undefined );
    assert.strictEqual ( getProperty ( a, "c", null ), null );
    assert.strictEqual ( getProperty ( a, "c", 10 ), 10 );

    const b = [];
    assert.strictEqual ( getProperty ( b, 0 ), undefined );
    assert.strictEqual ( getProperty ( b, 0, null ), null );
    assert.strictEqual ( getProperty ( b, 0, 10 ), 10 );

    if ( "undefined" !== ( typeof MouseEvent ) ) // Do not test on node.
    {
      const m = new MouseEvent ( "test" );
      assert.strictEqual ( getProperty ( m, "clientZ" ), undefined );
    }
  } );

  it ( "Getting shallow properties from invalid container object", function()
  {
    assert.strictEqual ( getProperty ( 10, "p" ), undefined );
    assert.strictEqual ( getProperty ( "a", "p" ), undefined );
    assert.strictEqual ( getProperty ( "", "p" ), undefined );
    assert.strictEqual ( getProperty ( 0, "p" ), undefined );
    assert.strictEqual ( getProperty ( null, "p" ), undefined );
    assert.strictEqual ( getProperty ( undefined, "p" ), undefined );

    assert.strictEqual ( getProperty ( 10, "p", 10 ), 10 );
    assert.strictEqual ( getProperty ( "a", "p", 10 ), 10 );
    assert.strictEqual ( getProperty ( "", "p", 10 ), 10 );
    assert.strictEqual ( getProperty ( 0, "p", 10 ), 10 );
    assert.strictEqual ( getProperty ( null, "p", 10 ), 10 );
    assert.strictEqual ( getProperty ( undefined, "p", 10 ), 10 );
  } );
} );


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Should be fast when ...", function()
{
  const a = { b: 1, c: "hi", d: { e: 10 } };

  const { numIterations, allowedTime } = getSpeedTestConfig();

  it ( "Getting shallow properties that exist", function()
  {
    const startTime = Date.now();
    for ( let i = 0; i < numIterations; ++i )
    {
      getProperty ( a, "b" );
    }
    expect ( Date.now() - startTime ).to.be.below ( allowedTime );
  } );

  it ( "Getting shallow properties that do not exist", function()
  {
    const startTime = Date.now();
    for ( let i = 0; i < numIterations; ++i )
    {
      getProperty ( a, "bb" );
    }
    expect ( Date.now() - startTime ).to.be.below ( allowedTime );
  } );

  it ( "Getting shallow properties from invalid container object", function()
  {
    const startTime = Date.now();
    for ( let i = 0; i < numIterations; ++i )
    {
      getProperty ( null, "p" );
    }
    expect ( Date.now() - startTime ).to.be.below ( allowedTime );
  } );
} );


////////////////////////////////////////////////////////////////////////////////
//
//  End of the scope.
//
////////////////////////////////////////////////////////////////////////////////

} );
