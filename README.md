# se-runner-selenium-standalone-example

> Ready to run example using [se-runner](https://github.com/Hyddan/se-runner#readme) with [grunt-se-runner](https://github.com/Hyddan/grunt-se-runner#readme) and [se-runner-framework-jasmine](https://github.com/Hyddan/se-runner-framework-jasmine#readme) towards a selenium-standalone server

## Installation
Fork and/or clone, run `npm install` and make changes as needed.

## NPM package
* https://npmjs.com/package/se-runner-selenium-standalone-example

## Overview
#### Gruntfile.js
The grunt file will begin by starting a selenium-standalone server and a local web server (hosting the test harness) and then start executing the specified tests.

#### Config folder
Contains the capabilities configurations, i.e. which browsers & devices to test against.

#### Server folder
The server folder is what is being exposed through the local web server. Files in here will be made available in the tests over HTTP (using the address: http://localhost:9999/).

For instance, this example has a simple test harness (harness.html) which sets up a simple HTML5 video that the tests can check against.

#### Test folder
Holds a few simple sample tests that load up the test harness and checks that a few things occurred.

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style.

## Release History

 * 2017-10-09   v1.0.0   Initial version.