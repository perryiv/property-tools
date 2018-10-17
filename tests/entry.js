
////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2018, ESI Group
//  All rights reserved.
//
//  Author: Perry L Miller IV
//
////////////////////////////////////////////////////////////////////////////////

"use strict";


////////////////////////////////////////////////////////////////////////////////
//
//  Exports either the distribution file or the original source file depending
//  on an environment variable.
//
////////////////////////////////////////////////////////////////////////////////

if ( "undefined" === typeof ( IS_BROWSER_BUILD ) )
{
  // We're not in a browser (probably Node) so use the original source file.
  module.exports = require ( "../source/main" );
}

else
{
  /* eslint-disable no-undef */

  // We're in a browser so return the global object that was separately
  // included with the distribution file.
  module.exports = PropertyTools;

  /* eslint-enable no-undef */
}
