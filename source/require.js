
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
//  Function(s) for requiring properties.
//
////////////////////////////////////////////////////////////////////////////////

"use strict";


////////////////////////////////////////////////////////////////////////////////
/**
 * Require the given property to be present.
 * If the property is not found then an exception is thrown.
 * @param {Object} container The object that must contain the property.
 * @param {String} name The name of the property to get.
 * @return {Object} The property.
 */
//  See: http://andrew.hedges.name/experiments/in/
//
////////////////////////////////////////////////////////////////////////////////

const requireProperty = function ( container, name )
{
  // Do not check this because name could be 0 (zero).
  //if ( !name )
  //{
  //  throw new Error ( "Invalid name");
  //}

  // We need a valid container object.
  if ( !container )
  {
    throw new Error ( "Invalid container object" );
  }

  // According to this page:
  // http://andrew.hedges.name/experiments/in/
  // Doing it this way is usually faster.
  var value = container[name];
  if ( "undefined" !== ( typeof value ) )
  {
    return value;
  }

  throw new Error ( "Property '" + name + "' not in object" );
};


////////////////////////////////////////////////////////////////////////////////
//
//  The end of this module.
//
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  requireProperty
};
