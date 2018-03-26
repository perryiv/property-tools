
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

const { requireAndCopyProperty } = require ( "./helpers" );
const { setProperty } = require ( "./entry" );

const { assert, expect } = require ( "chai" );


////////////////////////////////////////////////////////////////////////////////
//
//  Before and after values used below.
//
////////////////////////////////////////////////////////////////////////////////

const values = [
  { before: 0, after: 42 },
  { before: 1, after: 42 },
  { before: 1.1, after: 42 },
  { before: "1", after: 42 },
  { before: "", after: 42 },
  { before: null, after: 42 },
  { before: undefined, after: 42 },
  { before: {}, after: 42 },
  // { before: [], after: 42 }, // Special cases below.
  { before: 42, after: 0 },
  { before: 42, after: 1 },
  { before: 42, after: 1.1 },
  { before: 42, after: "1" },
  { before: 42, after: "" },
  { before: 42, after: null },
  { before: 42, after: undefined },
  { before: 42, after: {} },
  { before: 42, after: [] }
];


////////////////////////////////////////////////////////////////////////////////
//
//  Start of the scope.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Set", function() {


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Should work when ...", function()
{
  it ( "Setting shallow properties that exist", function()
  {
    for ( let i = 0; i < values.length; ++i )
    {
      const before = requireAndCopyProperty ( values[i], "before" );
      const after = requireAndCopyProperty ( values[i], "after" );

      const o1 = { a: 1, b: before };
      const o2 = { a: 1, b: after  };

      assert.strictEqual ( o1, setProperty ( o1, "b", after ) );
      assert.deepEqual ( o1, o2 );
    }
  } );

  it ( "Setting deep properties that exist", function()
  {
    for ( let i = 0; i < values.length; ++i )
    {
      const before = requireAndCopyProperty ( values[i], "before" );
      const after = requireAndCopyProperty ( values[i], "after" );
      {
        const o1 = { i: i, b: { c: { d: before } } };
        const o2 = { i: i, b: { c: { d: after } } };
        assert.strictEqual ( o1, setProperty ( o1, [ "b", "c", "d" ], after ) );
        assert.deepEqual ( o1, o2 );
      }
      {
        const o1 = { i: i, e: { f: before } };
        const o2 = { i: i, e: { f: { g: after } } };
        assert.strictEqual ( o1, setProperty ( o1, [ "e", "f", "g" ], after ) );
        assert.deepEqual ( o1, o2 );
      }
    }
    {
      const o1 = { a: 12, e: { f: [] } };
      const o2 = { a: 12, e: { f: [] } }; o2.e.f.g = after;
      assert.strictEqual ( o1, setProperty ( o1, [ "e", "f", "g" ], after ) );
      assert.deepEqual ( o1, o2 );
    }
  } );

  it ( "Setting shallow properties that do not exist", function()
  {
    for ( let i = 0; i < values.length; ++i )
    {
      const before = requireAndCopyProperty ( values[i], "before" );
      const after = requireAndCopyProperty ( values[i], "after" );
      {
        const o1 = { a: 1, b: before };
        const o2 = { a: 1, b: before, c: after  };
        assert.strictEqual ( o1, setProperty ( o1, "c", after ) );
        assert.deepEqual ( o1, o2 );
      }
      {
        const o1 = { a: 1, b: before };
        const o2 = { a: 1, b: before, "10": after };
        assert.strictEqual ( o1, setProperty ( o1, 10, after ) );
        assert.deepEqual ( o1, o2 );
      }
    }
  } );

  it ( "Setting deep properties that do not exist", function()
  {
    for ( let i = 0; i < values.length; ++i )
    {
      const before = requireAndCopyProperty ( values[i], "before" );
      const after = requireAndCopyProperty ( values[i], "after" );
      {
        const o1 = { i: i, b: before };
        const o2 = { i: i, b: { c: { d: after } } };
        assert.strictEqual ( o1, setProperty ( o1, [ "b", "c", "d" ], after ) );
        assert.deepEqual ( o1, o2 );
      }
      {
        const o1 = { i: i, e: before };
        const o2 = { i: i, e: before, "2": { "f": { "11": after } } };
        assert.strictEqual ( o1, setProperty ( o1, [ 2, "f", 11 ], after ) );
        assert.deepEqual ( o1, o2 );
      }
    }
  } );

  it ( "Setting shallow or deep properties with an invalid name should throw", function()
  {
    const invalidNameError = "Invalid name when setting property";
    const emptyArrayError = "Array of property names is empty";

    const names = [
      { name: "", error: invalidNameError },
      { name: null, error: invalidNameError },
      { name: undefined, error: invalidNameError },
      { name: {}, error: invalidNameError },
      { name: [], error: emptyArrayError },
      { name: new Array(), error: emptyArrayError },
      { name: new Object(), error: invalidNameError }
    ];

    for ( let i = 0; i < names.length; ++i )
    {
      const name = requireAndCopyProperty ( names[i], "name" );
      const error = requireAndCopyProperty ( names[i], "error" );
      const temp = { a: 1, b: 2 };
      {
        const o1 = Object.assign ( {}, temp );
        expect ( function() { setProperty ( o1, name, 2 ); } )
        .to.throw ( Error, error );
        assert.deepEqual ( o1, { a: 1, b: 2 } );
      }
      {
        const o1 = Object.assign ( {}, temp );
        expect ( function() { setProperty ( o1, [ "a", name ], 2 ); } )
        .to.throw ( Error, "Invalid name at position 1 when setting property" );
        assert.deepEqual ( o1, { a: {}, b: 2 } );
      }
      {
        const o1 = Object.assign ( {}, temp );
        expect ( function() { setProperty ( o1, [ "a", "b", name ], 2 ); } )
        .to.throw ( Error, "Invalid name at position 2 when setting property" );
        assert.deepEqual ( o1, { a: { b: {} }, b: 2 } );
      }
      {
        const o1 = Object.assign ( {}, temp );
        expect ( function() { setProperty ( o1, [ "a", name, "b" ], 2 ); } )
        .to.throw ( Error, "Invalid name at position 1 when setting property" );
        assert.deepEqual ( o1, { a: {}, b: 2 } );
      }
    }
  } );

  it ( "Setting shallow or deep properties in an invalid container object should throw", function()
  {
    const containers = [ 1, Number.MAX_SAFE_INTEGER, "a", "", null, undefined ];

    for ( let i = 0; i < containers.length; ++i )
    {
      const container = requireAndCopyProperty ( containers, i );

      expect ( function() { setProperty ( container, "b", 2 ); } )
      .to.throw ( Error, "Invalid container given when setting property" );

      expect ( function() { setProperty ( container, [ "b", "c", "d" ], 2 ); } )
      .to.throw ( Error, "Invalid container given when setting property" );
    }
  } );
} );


////////////////////////////////////////////////////////////////////////////////
//
//  End of the scope.
//
////////////////////////////////////////////////////////////////////////////////

} );
