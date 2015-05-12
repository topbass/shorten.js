'use strict';

module.exports = function(config) {
  config.set({
    basePath: '../',

    preprocessors: {
      'public/javascripts/app/main.js': ['browserify'],
      'tests/unit-ng/**/*_test.js': ['browserify']
    },

    browserify: {
      watch: true,
      debug: true
    },

    files: [
      'public/javascripts/app/main.js',
      'tests/unit-ng/**/*_test.js'
    ],

    singleRun: false,
    autoWatch: true,

    frameworks: ['jasmine', 'browserify'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-browserify',
      'karma-junit-reporter'
    ],

    junitReporter : {
      outputFile: 'tests/out/unit.xml',
      suite: 'unit'
    }
  });
};
