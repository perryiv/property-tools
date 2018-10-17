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
//  Test the functions for the error handler.
//
////////////////////////////////////////////////////////////////////////////////

/* eslint-env node, mocha */

"use strict";

const {
  requireProperty,
  getErrorHandler,
  setErrorHandler
} = require ( "./entry" );

const { expect } = require ( "chai" );


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

describe ( "Default error handler ...", function()
{
  it ( "Should throw an exception", function()
  {
    expect ( function()
    {
      requireProperty ( { a: "a" }, "b" );
    } )
    .to.throw ( Error, "Property 'b' not in object" );
  } );
} );


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Custom error handler ...", function()
{
  let called = false;

  const handleErrors = function ( error )
  {
    expect ( error ).to.equal ( "Property 'd' not in object" );
    called = true;
  };

  before ( function()
  {
    setErrorHandler ( handleErrors );
  } );

  it ( "Should be set", function()
  {
    expect ( getErrorHandler() ).to.equal ( handleErrors );
  } );

  it ( "Should not be called yet", function()
  {
    expect ( called ).to.equal ( false );
  } );

  it ( "Requiring invalid property should return undefined", function()
  {
    expect ( requireProperty ( { c: "c" }, "d" ) ).to.equal ( undefined );
  } );

  it ( "Now error handler should have been called", function()
  {
    expect ( called ).to.equal ( true );
  } );

  it ( "Requiring invalid property should not throw", function()
  {
    expect ( function() { requireProperty ( { c: "c" }, "d" ); } ).to.not.throw();
  } );

  it ( "Setting new error handler should return the existing one", function()
  {
    expect ( setErrorHandler ( null ) ).to.equal ( handleErrors );
  } );

  after ( function()
  {
    setErrorHandler ( null );
  } );
} );


////////////////////////////////////////////////////////////////////////////////
//
//  Test the function.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Default error handler ...", function()
{
  it ( "Should be restored", function()
  {
    expect ( function() { requireProperty ( { c: "c" }, "d" ); } ).to.throw ( Error, "Property 'd' not in object" );
  } );
} );


////////////////////////////////////////////////////////////////////////////////
//
//  End of the scope.
//
////////////////////////////////////////////////////////////////////////////////

} );
