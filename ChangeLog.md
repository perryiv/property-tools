# Changelog

This changelog is inspired by the
[Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
project and uses
[Semantic Versioning](https://semver.org/).

## Unreleased

- Added a config file for
[Travis CI](https://travis-ci.org/perryiv/property-tools/).
- Updated the function ``getVersion()`` to now get its information directly from the ``package.json`` file.
- Updated ``getVersion()``'s test code to do the same.
- Added extra checks to make sure the version numbers are positive integers.
- Using ``chai.expect()`` instead of ``chai.assert()`` in speed tests for better error messages when these tests fail.
- Using a helper function to get the number of iterations and allowed time in the speed tests, since this information is needed in more than one place.
- Increased the allowed time in the speed tests from 50 to 60 milliseconds because it was failing in
[Travis CI](https://travis-ci.org/perryiv/property-tools/builds/358207232).


## 0.1.2 -- 2018-03-25

- Added the ``source`` directory to the ``files`` property in ``package.json``, so that the test code is not downloaded when you ``npm install property-tools``.

## 0.1.1 -- 2018-03-24

- Added a test to make sure the correct functions are exported.
- Updated the ReadMe file.
- Updated the version in the code and the corresponding test.
- Updated the keywords in the package.json file.

## 0.1.0 -- 2018-03-24

- Initial commit for this project.