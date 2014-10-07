module.exports = function (config) {
    config.set({ 
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            'karma-*'
        ],
        
        files: [
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/lodash/dist/lodash.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap.js',
            'app/bower_components/spin.js/spin.js',
            'app/template-cache/template-cache.js',            
            'app/source/**/*.js',
            'test/helper/*.js',
            'test/spec/**/*.js' 
        ],
		        
        exclude: [],

        preprocessors: {
            'app/source/**/*.js': 'coverage'
        },


        // test results reporter to use
        // possible values: dots || progress || growl        
		reporters : ["dots", "coverage"],

        coverageReporter : {
            reporters:[
                {type: 'html', dir: '.tmp/coverage/'},
                {type: 'json', dir: '.tmp/coverage/'},
                {type: 'text-summary', dir: '.tmp/coverage/'}
            ]
        },

        // web server port
        port: 8080,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers : ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
