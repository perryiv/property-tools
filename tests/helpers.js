
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
//  Helper functions used in tests.
//
////////////////////////////////////////////////////////////////////////////////

/* eslint-env node, mocha */

"use strict";

const { assert } = require ( "chai" );


////////////////////////////////////////////////////////////////////////////////
//
//  Similar to requireProperty() but allows values of undefined.
//  It also makes a copy.
//
////////////////////////////////////////////////////////////////////////////////

const requireAndCopyProperty = function ( container, name )
{
  assert.ok ( name in container );
  let value = container[name];

  // If it's an object and it's not null then copy it.
  if ( ( "object" === typeof ( value ) ) && ( null !== value ) )
  {
    value = JSON.parse ( JSON.stringify ( value ) );
  }

  return value;
};


////////////////////////////////////////////////////////////////////////////////
//
//  The end of this module.
//
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  requireAndCopyProperty
};
