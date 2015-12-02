// This directory contains a test suite that checks that the ExtJS emitter outputs correct code.
// These tests should be run from the root of the project with "jake runtests-extjs"


var fs = require('fs'),
    child_process = require('child_process');


fs.readdirSync('input').forEach(function(input) {
    exports[input] = function(test) {
        child_process.exec(
            'node ../../built/local/tsc.js --outDir actual-output input/' + input,
            function(error, stdout, stderr) {

                if (error !== null) {
                    console.error('Error calling tsc: ' + stdout + '' + stderr);
                }

                var outputFile = input.replace(/\.ts$/, '.js'),
                    expectedOutput = fs.readFileSync('expected-output/' + outputFile, 'utf8'),
                    actualOutput = fs.readFileSync('actual-output/' + outputFile, 'utf8');

                test.equal(actualOutput, expectedOutput);
                test.done();
            }
        );
    };
});