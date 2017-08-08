const { basename, extname } = require('path')
const { compile } = require('svelte')
const through = require('through2')

const defaultExtensions = [ '.html', '.svelte' ]

module.exports = function transformSvelte(file, options) {
	let data = ''

	const extensionsArray = (options.extensions && options.extensions._) || defaultExtensions

	const extension = extname(file)

	if (extensionIsInList(extension, extensionsArray)) {
		return through(function write(chunk, enc, cb) {
			data += chunk
			cb()
		}, function end(cb) {
			const base = basename(file)
			const name = sanitizeJavaScriptFunctionName(base.replace(extension, ''))

			try {
				const svelteOptions = Object.assign({}, options.svelte, {
					name,
					filename: base,
					format: 'cjs'
				})
				const { code, map } = compile(data, svelteOptions)
				this.push(code)
				this.push('\n//# sourceMappingURL=' + map.toUrl())

				cb()
			} catch (err) {
				cb(err)
			}
		})
	} else {
		return through()
	}
}

function extensionIsInList(extension, extensionsArray) {
	return extensionsArray.indexOf(extension.toLowerCase()) !== -1
}

function sanitizeJavaScriptFunctionName(text) {
	return text.replace(/\W/g, '')
}
