var extjsDependenciesExplore = function (config) {
	var fs = require('fs'),
		dependencies = {},
		explore,
		readFileSync,
		readFileAsString,
		readRequires,
		readExtend,
		mergeToTarget;

	readFileSync = function (file) {
		return fs.readFileSync(file, "utf8");
	};

	readFileAsString = function (file) {
		return readFileSync(file).replace(/\r?\n|\r| |\t|\'/g, '');
	};

	readRequires = function (fileAsString) {
		var requiresAsArray = /requires:\[([a-zA-Z\.\,]+)\]/.exec(fileAsString),
			requires;

		if (requiresAsArray && requiresAsArray.length > 1) {
			requires = requiresAsArray[1].split(',');

			for (var i = 0; i < requires.length; i++) {
				dependencies[requires[i]] = requires[i];
			}
		}
	};

	readExtend = function (fileAsString) {
		var extendAsArray = /extend:([a-zA-Z\.]+)/.exec(fileAsString);
		if (extendAsArray && extendAsArray.length > 1) {
			dependencies[extendAsArray[1]] = extendAsArray[1]
		}
	};

	mergeToTarget = function (requires) {
		if (!requires.length) {
			return;
		}
		var appFileName = config.target + config.targetExtension;

		console.log();
		console.log('-> additional extJS dependencies:', requires.join(','));

		console.log();
		console.log('-> patch app file:', appFileName);

		requires = requires.map(function (extjsClass) {
			return '        \'' + extjsClass + '\'';
		});

		fs.writeFile(
			config.path + '/' + appFileName,
			[
				"Ext.define('" + [config.appNamespace, config.target].join('.') + "', {",
				"    requires: [",
				requires.join(',\n'),
				"    ]",
				"});"].join('\n')
		);
	};

	explore = function (dir, done) {
		var results = [];

		fs.readdir(dir, function (err, list) {
			var i = 0;

			(function next() {
				var file = list[i++];
				if (!file) return done(null, results);

				if (/.+\.ts/.test(file)) {
					var fileAsString = readFileAsString(dir + '/' + file);
					readRequires(fileAsString);
					readExtend(fileAsString);
				}
				file = dir + '/' + file;
				fs.stat(file, function (err, stat) {
					(stat && stat.isDirectory()) ? explore(file, next) : next();
				});
			})();
		});
	};

	explore(config.path, function () {
		var dependenciesAsArray = [],
			extjsClass;

		for (extjsClass in dependencies) {
			if (dependencies.hasOwnProperty(extjsClass)) {
				dependenciesAsArray.push(extjsClass);
			}
		}
		mergeToTarget(dependenciesAsArray);
	});
};

exports.extjsDependenciesExplore = extjsDependenciesExplore;