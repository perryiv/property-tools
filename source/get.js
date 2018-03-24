
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
//  Function(s) for getting properties.
//
////////////////////////////////////////////////////////////////////////////////

"use strict";


////////////////////////////////////////////////////////////////////////////////
//
//  Return the property or the given default.
//
////////////////////////////////////////////////////////////////////////////////

const getDeepProperty = function ( container, keys, defaultValue )
{
  // We need at least one element in the array.
  const num = keys.length;
  if ( num <= 0 )
  {
    return defaultValue;
  }

  // The current container.
  let current = container;

  // Loop through all the keys.
  for ( let i = 0; i < num; ++ i )
  {
    // Can we continue?
    if ( !current )
    {
      return defaultValue;
    }

    // Get the current key.
    const key = keys[i];

    // Get the current value.
    current = current[key];
  }

  // If we get to here then the answer is whatever we have.
  return current;
};


////////////////////////////////////////////////////////////////////////////////
/**
 * Return the property or the given default.
 * @param {Object} container The object that may contain the property.
 * @param {String} name The name or path of the property to get.
 * @param {Object} defaultValue The value to return if the object does not
 * have a property by that name.
 * @return {Object} The property or the given default value.
 */
//  See: http://andrew.hedges.name/experiments/in/
//
////////////////////////////////////////////////////////////////////////////////

const getProperty = function ( container, name, defaultValue )
{
  // Do not check "if ( name )" because name could be 0 (zero).
  if ( container )
  {
    // If the name is an array then call the other function.
    if ( Array.isArray ( name ) )
    {
      return getDeepProperty ( container, name, defaultValue );
    }

    // This doesn't work for MouseEvent in Chrome 43.0.2357.124 (64-bit) on
    // Mac because the properties are not regular JavaScript properties.
    //if ( container.hasOwnProperty ( name ) )

    // According to this page, doing it this way is usually faster:
    // http://andrew.hedges.name/experiments/in/
    var value = container[name];
    if ( "undefined" !== ( typeof value ) )
    {
      return value;
    }
  }

  // If we get to here then return the default value.
  return defaultValue;
};


////////////////////////////////////////////////////////////////////////////////
//
//  The end of this module.
//
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  getProperty
};
