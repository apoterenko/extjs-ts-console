var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/jasmine\.js$/.test(file) || /jasmineT\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app/',

    paths: {
        //'jquery': '../lib/jquery',
        //'underscore': '../lib/underscore',
        'ExtJS': '../ext/build/ext-all-rtl-debug'
    },

    shim: {
        "ExtJS": {
            exports: 'Ext'
        }
        //'underscore': {
        //    exports: '_'
        //}
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
