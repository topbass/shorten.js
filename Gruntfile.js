/*
 * shorten.js
 *
 * URL shortener backed by Node.js, Express and MongoDB.
 * https://github.com/waltzofpearls/shorten.js
 *
 * Copyright (c) 2014 Topbass Labs (topbasslabs.com)
 * Author Waltz.of.Pearls <rollie@topbasslabs.com, rollie.ma@gmail.com>
 */

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        less: {
            testing: {
                options: {
                    strictMath: true,
                    compress: false
                },
                src: 'public/stylesheets/style.less',
                dest: 'public/stylesheets/style.css'
            },
            production: {
                options: {
                    strictMath: true,
                    cleancss: true
                },
                src: 'public/stylesheets/style.less',
                dest: 'public/stylesheets/style.css'
            }
        }
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    require('time-grunt')(grunt);

    grunt.registerTask('build', ['less:production']);
    grunt.registerTask('default', ['build']);
};
