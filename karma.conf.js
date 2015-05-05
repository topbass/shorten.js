'use strict';

module.exports = function(config) {
  config.set({
    basePath: './public/javascripts/',

    files: [
      'app/bower/angular/angular.js',
      'app/bower/angular-route/angular-route.js',
      'app/bower/angular-mocks/angular-mocks.js',
      'app/components/**/*.js',
      'app/view*/**/*.js'
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
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
