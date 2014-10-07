'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        express: {
            options: {
                port: process.env.PORT || 9000,
                hostname: '*'
            },
            dev: {
                options: {
                    script: 'devserver_config.js'
                }
            }
        },
        coverage: {
            options: {
                thresholds: {
                    'statements': 100,
                    'branches': 100,
                    'functions': 100,
                    'lines': 100
                },
                dir: 'coverage',
                root: '.tmp'
            }
        },
        watch: {           
            express: {
                files: [
                    'app/**/*.html',
                    '{.tmp,app}/styles/{,*//*}*.css',
                    '{.tmp,app}/*/{,*//*}*.js'                    
                ],
                tasks: ['express:dev'],
                options: {
                    livereload: true,
                    nospawn: true
                }
            },
            html2js: {
                files: ['app/source/**/*.html'],
                tasks: ['html2js']
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>/vangularjs-oct/app'
            },
            coverage: {
                url: __dirname + '/.tmp/coverage/PhantomJS 1.9.7 (Windows 7)/index.html'
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'dist/*',
                            '!dist/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'app/source/**/*.js'
            ]
        },        
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        uglify: {
            options: {
				mangle: false,
				compress: false,
				beautify: true
			}
        },
        usemin: {
            html: ['dist/{,*/}*.html'],
            css: ['dist/styles/{,*/}*.css'],
            options: {
                dirs: ['dist']
            }
        },

        html2js: {
            dist: {
                options: {
                    base: 'app'
                },
                src: ['app/source/**/*.html'],
                dest: 'app/template-cache/template-cache.js',
                module: 'sn.vangularjs.templateCache'
            }
        },        
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app',
                        dest: 'dist',
                        src: [                            
                            'index.html',
                            'template-cache/*'
                        ]
                    }
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        ngAnnotate: {
			options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '**/*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        }
    });


    grunt.registerTask('server', [
        'clean:server',        
        'html2js',
        'express:dev',
        'open:server',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'html2js',
        'jshint',
        'karma',
        'coverage',		
		'useminPrepare',
        'concat',
        'ngAnnotate',
        'uglify',
        'cssmin',
        'copy',
        'usemin'
    ]);
 

    grunt.registerTask('default', [
        'jshint',        
        'build'
    ]);
};
