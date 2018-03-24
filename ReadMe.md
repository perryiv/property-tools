# Property Tools

This module contains helper functions for getting, setting, and requiring both shallow and deep properties in objects.

## Building

If you want to build it for the browser then do this:

    cd /your/path/property-tools
    npm install
    npm build

or

    npm build-min

To build the tests:

    npm run build-test

## Testing

To test the code in a shell:

    npm run test

To test the code in a browser, first do this:

    npm run server

Then point your browser to whatever url is printed to the shell.
Most likely it will be this:

    http://127.0.0.1:8080

## Developing

To automatically lint, build, and test whenever you edit the code, do this:

    npm run watch

## Using

The package exports these functions:

    const {
      getProperty,
      setProperty,
      requireProperty,
      getVersion
    } = require ( "property-tools" );

#### Get Version

Get the version:

    assert.deepEqual ( getVersion(), { major: 1, minor: 0, patch: 0 } );

#### Get Property

Getting a property that exists:

    assert.equal ( getProperty ( { a: 1 }, "a" ), 1 );

Getting a property that does not exist just returns the default value:

    const a = { b: 1 };
    assert.equal ( getProperty ( a, "c" ), undefined );
    assert.equal ( getProperty ( a, "c", 10 ), 10 );

Getting a property from an invalid container object just returns the default value:

    assert.equal ( getProperty ( null, "p" ), undefined );
    assert.equal ( getProperty ( null, "p", 10 ), 10 );

#### Require Property

Requiring a property that exists:

    assert.equal ( requireProperty ( { a: 1 }, "a" ), 1 );

Requiring a property that does not exist will throw an exception:

    expect ( function() { requireProperty ( { b: 1 }, "c" ); } )
      .to.throw ( Error, "Property 'c' not in object" );

Requiring a property from an invalid container object will throw an exception:

    expect ( function() { requireProperty ( null, "p" ); } )
      .to.throw ( Error, "Invalid container object" );
