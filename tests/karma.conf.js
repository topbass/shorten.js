'use strict';

module.exports = function(config) {
  config.set({
    basePath: '../',

    preprocessors: {
      'public/javascripts/app.js': ['browserify']
    },

    browserify: {
      watch: true,
      debug: true
    },

    files: [
      // 'public/javascripts/bower/angular/angular.js',
      // 'public/javascripts/bower/angular-loader/angular-loader.js',
      // 'public/javascripts/bower/angular-animate/angular-animate.js',
      // 'public/javascripts/bower/angular-mocks/angular-mocks.js',
      // 'public/javascripts/bower/angular-resource/angular-resource.js',
      // 'public/javascripts/bower/angular-route/angular-route.js',
      'public/javascripts/app.js',
      'tests/unit-ng/**/*_test.js'
    ],

    singleRun: true,
    autoWatch: false,

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
