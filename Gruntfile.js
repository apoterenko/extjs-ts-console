var extModule = require('./tasks/ext-module.js');

module.exports = function (grunt) {
	var appConfig = grunt.file.readJSON('package.json'),
		appNamespace = appConfig.name;

	extModule.extjsDependenciesExplore({
		path: './app',
		target: 'RuntimeDependencies',
		targetExtension: '.js',
		appNamespace: appNamespace
	});

	grunt.initConfig({
		exec: {
			tsd: 'tsd install',
			/**
			 * Delete obsolete references to the modules removed from the tsd.json
			 */
			tsdReinstall: 'tsd reinstall --clean',
			tsc: {
				cwd: 'packages/typescriptextjs/',
				command: 'jake'
			}
		},
		ts: {
			options: {
				compiler: './packages/typescriptextjs/built/local/tsc.js',
				module: "amd"
			},
			app: {
				src: [
					"app/**/*.ts"
				]
			},
			tests: {
				src: [
					"tests/**/*.ts"
				]
			}
		},
		requirejs: {
			compile: {
				options: {
					name: 'app-amd',
					baseUrl: '.',
					paths: {
						//'ExtJS': '../ext/build/ext-all-rtl-debug'
						/**
						 * ExtJS have be loaded already
						 */
						'ExtJS': './app/dummy'
					},
					shim: {
						"ExtJS": {
							exports: 'Ext'
						}
					},
					out: "build/production/" + appNamespace + "/classic/mc-amd.js"
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks("grunt-ts");

	grunt.registerTask('default', ['exec', 'ts', 'requirejs']);
};