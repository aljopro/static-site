const through = require('through2');
const fs = require('fs');
const path = require('path');

function getTemplate(options) {
	const templateCache = {};
	const defaultOptions = {
		templateDir: './templates'
	}
	const opts = Object.assign({}, defaultOptions, options);

	return through.obj((file, enc, cb) => {
		let templatePath = path.join(opts.templateDir, file.data.layout);
		let template = templateCache[templatePath];

		if(!template) {
			template = fs.readFileSync(templatePath);
			templateCache[templatePath] = template;
		}

		let filePath = file.path;

		if(file.data.permalink) {
			filePath = path.join(path.resolve(file.base || file.path), file.data.permalink);
		}

		file.path = filePath;
		file.contents = new Buffer(template);
		cb(null, file);
	});
}

module.exports = getTemplate;
