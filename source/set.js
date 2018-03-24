
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
//  Function(s) for getting or creating properties.
//
////////////////////////////////////////////////////////////////////////////////

"use strict";


////////////////////////////////////////////////////////////////////////////////
//
//  Valid keys are numbers or strings that are not empty.
//
////////////////////////////////////////////////////////////////////////////////

const isValidKey = function ( name )
{
  const type = typeof ( name );

  if ( "number" === type )
  {
    return true;
  }

  if ( "string" === type )
  {
    if ( name.length > 0 )
    {
      return true;
    }
  }

  return false;
};


////////////////////////////////////////////////////////////////////////////////
//
//  Valid containers are objects that are not null.
//
////////////////////////////////////////////////////////////////////////////////

const isValidContainer = function ( container )
{
  // A container has to be an object.
  if ( "object" !== typeof ( container ) )
  {
    return false;
  }

  // For some reason null's type is "object" so catch that case too.
  if ( null === container )
  {
    return false;
  }

  // If we get this far then it is a valid container.
  return true;
};


////////////////////////////////////////////////////////////////////////////////
//
//  Set the property if it exists. Create it if needed.
//
////////////////////////////////////////////////////////////////////////////////

const setDeepProperty = function ( container, keys, value )
{
  // We need at least one element in the array.
  const num = keys.length;
  if ( num <= 0 )
  {
    throw new Error ( "Array of property names is empty" );
  }

  // The current container.
  let current = container;

  // Loop through all the keys except the last one.
  const stop = num - 1;
  for ( let i = 0; i < stop; ++ i )
  {
    // Get the current key.
    const key = keys[i];

    // Make sure the key is valid.
    if ( !isValidKey ( key ) )
    {
      throw new Error ( "Invalid name at position " + i + " when setting property" );
    }

    // Create the property if we need to.
    // The value's type has to be "object", which includes:
    // [], {}, new Array(), new String(), new Object(),
    // new Float32Array() and friends (other TypedArray types)
    // We have to explicitly check for null because its type is also "object".
    const next = current[key];
    if ( "object" !== typeof ( next ) )
    {
      current[key] = {};
    }
    else if ( null === next )
    {
      current[key] = {};
    }

    // Go to the next one.
    current = current[key];
  }

  // Now that we know all the properties exist, get the last key.
  const last = keys [ num - 1 ];

  // Make sure it is valid.
  if ( !isValidKey ( last ) )
  {
    throw new Error ( "Invalid name at position " + stop + " when setting property" );
  }

  // Set the property corresponding to the last key.
  current[last] = value;

  // Always return the container object.
  return container;
};


////////////////////////////////////////////////////////////////////////////////
//
//  Set the property if it exists. Create it if needed.
//
////////////////////////////////////////////////////////////////////////////////

const setProperty = function ( container, name, value )
{
  // Check the container.
  if ( !isValidContainer ( container ) )
  {
    throw new Error ( "Invalid container given when setting property" );
  }

  // If the name is an array then call the other function.
  if ( Array.isArray ( name ) )
  {
    return setDeepProperty ( container, name, value );
  }

  // Make sure the name is valid.
  if ( !isValidKey ( name ) )
  {
    throw new Error ( "Invalid name when setting property" );
  }

  // Set the property.
  container[name] = value;

  // Always return the container object.
  return container;
};


////////////////////////////////////////////////////////////////////////////////
//
//  The end of this module.
//
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  setProperty
};
