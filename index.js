const { basename, extname } = require('path')
const { compile } = require('svelte')
const through = require('through2')

const defaultExtensions = [ '.html', '.svelte' ]

module.exports = function transformSvelte(file, options) {
	let data = ''

	const extensionsArray = (options.extensions && options.extensions._) || defaultExtensions

	const extension = extname(file)

	if (exentionIsInList(extension, extensionsArray)) {
		return through(function write(chunk, enc, cb) {
			data += chunk
			cb()
		}, function end(cb) {
			const base = basename(file)
			const name = base.replace(extension, '')

			const { code, map } = compile(data, {
				name
			})

			const cjsCode = code.replace(/^export default /mg, () => 'module.exports=')

			this.push(cjsCode)
			this.push('\n//# sourceMappingURL=' + map.toUrl())

			cb()
		})
	} else {
		return through()
	}
}

function exentionIsInList(extension, extensionsArray) {
	return extensionsArray.indexOf(extension.toLowerCase()) !== -1
}
