module.exports = function (grunt) {
    var path = require('path'),
        webpackConfig = require('./webpack_config.js'),
        config;

    var HOST = '192.168.1.122',
        BASE_PATH = __dirname,
        STATIC_PATH = path.join(BASE_PATH, 'static/');

    require('load-grunt-tasks')(grunt);

    config = {
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            src: STATIC_PATH,
            srcJs: path.join(STATIC_PATH, 'js/'),
            srcCss: path.join(STATIC_PATH, 'css/'),
            images: path.join(STATIC_PATH, 'images/')
        },

        sass: {
            options: {
                sourceMap: false
            },
            build: {
                files: {
                    '<%= dirs.srcCss %>/main.css': '<%= dirs.srcCss %>/main.scss'
                }
            }
        },

        webpack: {
            options: webpackConfig,
            compileJs: {
                stats: {
                    colors: true,
                    modules: true,
                    reasons: true
                }
            }
        },

        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.images %>',
                    src: [
                        'jpg/*.jpg',
                        'png/*.png'
                    ],
                    dest: '<%= dirs.images %>build/'
                }]
            }
        },

        watch: {
            sass: {
                files: '<%= dirs.srcCss %>*.scss',
                tasks: [
                    'sass:build'
                ],
                options: {
                    livereload: true
                }
            },

            scripts: {
                files: ['<%= dirs.srcJs %>*.js', '!<%= dirs.srcJs %>build/*.js'],
                tasks: ['webpack:compileJs'],
                options: {
                    livereload: true
                }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '<%= dirs.srcCss %>*.css',
                        '<%= dirs.srcJs %>build/*.js',
                        'index.html'
                    ]
                },
                options: {
                    host: HOST,
                    ghostMode: false,
                    watchTask: true,
                    open: false,
                    server:  './'
                }
            }
        }
    };

    grunt.initConfig(config);

    grunt.registerTask('default', [
        'webpack',
        'sass',
        'imagemin',
        'browserSync',
        'watch'
    ]);
};
