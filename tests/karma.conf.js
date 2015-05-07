'use strict';

module.exports = function(config) {
  config.set({
    basePath: '../',

    files: [
      'public/javascripts/bower/angular/angular.js',
      'public/javascripts/bower/angular-route/angular-route.js',
      'public/javascripts/bower/angular-resource/angular-resource.js',
      'public/javascripts/bower/angular-animate/angular-animate.js',
      'public/javascripts/bower/angular-mocks/angular-mocks.js',
      'public/javascripts/components/**/*.js',
      'tests/unit-ng/**/*.js'
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
