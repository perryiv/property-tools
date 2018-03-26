
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
//  Test the function for requiring a property.
//
////////////////////////////////////////////////////////////////////////////////

/* eslint-env node, mocha */

"use strict";

const { requireProperty } = require ( "../source/main" );

const { assert, expect } = require ( "chai" );


////////////////////////////////////////////////////////////////////////////////
//
//  Start of the scope.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Require", function() {


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Should work when ...", function()
{
  it ( "Requiring properties that exist", function()
  {
    const a = { b: 1, c: "hi", d: { e: 10 } };
    assert.strictEqual ( requireProperty ( a, "b" ), 1 );
    assert.strictEqual ( requireProperty ( a, "c" ), "hi" );
    assert.deepEqual ( requireProperty ( a, "d" ), { e: 10 } );

    const b = [ 1, "b", { c: 2 } ];
    assert.strictEqual ( requireProperty ( b, 0 ), 1 );
    assert.strictEqual ( requireProperty ( b, 1 ), "b" );
    assert.deepEqual ( requireProperty ( b, 2 ), { c: 2 } );

    if ( "undefined" !== ( typeof MouseEvent ) ) // Do not test on node.
    {
      const m = new MouseEvent ( "test" );
      assert.strictEqual ( requireProperty ( m, "clientX" ), 0 );
    }
  } );

  it ( "Requiring properties that do not exist", function()
  {
    const a = { b: 1 };
    expect ( function() { requireProperty ( a, "c" ); } ).to.throw ( Error, "Property 'c' not in object" );
    expect ( function() { requireProperty ( a, "d" ); } ).to.throw ( Error, "Property 'd' not in object" );

    const b = [];
    expect ( function() { requireProperty ( b, 0 ); } ).to.throw ( Error, "Property '0' not in object" );
    expect ( function() { requireProperty ( b, 1 ); } ).to.throw ( Error, "Property '1' not in object" );

    if ( "undefined" !== ( typeof MouseEvent ) ) // Do not test on node.
    {
      const m = new MouseEvent ( "test" );
      expect ( function() { requireProperty ( m, "clientZ" ); } ).to.throw ( Error, "Property 'clientZ' not in object" );
    }
  } );

  it ( "Requiring properties from invalid container object", function()
  {
    expect ( function() { requireProperty ( 0, "p" ); } ).to.throw ( Error, "Invalid container object" );
    expect ( function() { requireProperty ( null, "p" ); } ).to.throw ( Error, "Invalid container object" );
    expect ( function() { requireProperty ( undefined, "p" ); } ).to.throw ( Error, "Invalid container object" );
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

  const num = 1e6;
  const allowedTime = 50;

  it ( "Requiring properties that exist", function()
  {
    const startTime = Date.now();
    for ( let i = 0; i < num; ++i )
    {
      requireProperty ( a, "b" );
    }
    expect ( Date.now() - startTime ).to.be.below ( allowedTime );
  } );

  // The other two cases:
  // -- Requiring properties that do not exist.
  // -- Requiring properties from invalid container object.
  // throw exceptions, so it does not make sense to test them for speed.
} );


////////////////////////////////////////////////////////////////////////////////
//
//  End of the scope.
//
////////////////////////////////////////////////////////////////////////////////

} );
