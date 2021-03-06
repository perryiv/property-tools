
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
//  ESLint configuration.
//
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  "env": {
    "browser": true,
    "commonjs": true
  },
  "parserOptions": {
    "ecmaVersion": 6
  },
  "extends": "eslint:recommended",
  "rules": {
    "linebreak-style": [ "error", "unix" ],
    "quotes": [ "error", "double" ],
    "semi": [ "error", "always" ],
    "no-console": "off"
  },
  "globals": {
  }
};
