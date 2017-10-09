/*
 * se-runner-selenium-standalone-example
 * https://github.com/Hyddan/se-runner-selenium-standalone-example
 *
 * Copyright (c) 2017 Daniel Hedenius
 * Licensed under the WTFPL-2.0 license.
 */

'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // Load grunt tasks automatically

    var capabilitiesExtender = function (c) {
                c.name = 'SeRunner::SeleniumStandalone Example';
                c.project = 'SeRunner.SeleniumStandalone.Example';

                return c;
            },
            seleniumStandaloneCapabilities = require('./config/capabilities.selenium-standalone.js').map(capabilitiesExtender);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            default: {
                src: [
                    'Gruntfile.js',
                    'test/**/*.js'
                ]
            }
        },
        shell: {
            localWebServer: {
                command: 'node server',
                options: {
                    async: true,
                    execOptions: {
                        cwd: './server'
                    },
                    stdout: function (data) {
                        console.log(data);
                    },
                    stderr: function (data) {
                        console.log(data);
                    },
                    callback: function (exitCode, stdOutStr, stdErrStr, done) {
                        done();
                    }
                }
            },
            seleniumStandalone: {
                command: 'selenium-standalone start',
                options: {
                    async: true,
                    execOptions: {
                        cwd: './node_modules/.bin'
                    },
                    stdout: function (data) {
                        console.log(data);
                    },
                    stderr: function (data) {
                        console.log(data);
                    },
                    callback: function (exitCode, stdOutStr, stdErrStr, done) {
                        done();
                    }
                }
            }
        },
        seRunner: {
            options: {
                concurrency: 1,
                context: {
                    url: 'http://localhost:9999/harness.html',
                    timeout: 20000
                },
                dependencies: [
                    require('path').join(process.cwd(), './lib/fast-selenium')
                ],
                framework: 'jasmine',
                logLevel: 'INFO',
                jasmine: {
                    dependencies: [],
                    timeout: 120000
                },
                tests: [
                    'test/**/*.js'
                ]
            },
            local: {
                options: {
                    capabilities: seleniumStandaloneCapabilities,
                    driverFactory: {
                        create: function (capabilities) {
                            var webdriverLogging = require('selenium-webdriver/lib/logging'),
                                    loggingPreferences = new webdriverLogging.Preferences();
                            loggingPreferences.setLevel(webdriverLogging.Type.BROWSER, webdriverLogging.Level.DEBUG);
                            return new (require('selenium-webdriver')).Builder()
                                                                        .usingServer(this.selenium.hub)
                                                                        .withCapabilities(capabilities)
                                                                        .setLoggingPrefs(loggingPreferences)
                                                                        .build();
                        }
                    },
                    selenium: {
                        hub: 'http://localhost:4444/wd/hub'
                    },
                    tests: [
                        'test/**/desktop/**/*.js'
                    ]
                }
            }
        }
    });

    grunt.registerTask('test.local', ['jshint', 'shell:seleniumStandalone', 'shell:localWebServer', 'seRunner:local']);
    grunt.registerTask('default', ['test.local']);
};