'use strict';

module.exports = function(config) {
  config.set({
    basePath: './public/javascripts/',

    files: [
      'bower/angular/angular.js',
      'bower/angular-route/angular-route.js',
      'bower/angular-mocks/angular-mocks.js',
      'components/**/*.js'//,
      //'view*/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter : {
      outputFile: 'tests/out/unit.xml',
      suite: 'unit'
    }
  });
};
