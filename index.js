const { basename, extname } = require(`path`)
const { compile } = require(`svelte/compiler`)
const through = require(`through2`)
const toPascalCase = require(`just-pascal-case`)

const defaultExtensions = [ `.html`, `.svelte` ]

module.exports = function transformSvelte(file, options) {
	let data = ``

	const extensionsArray = (options.extensions && options.extensions._) || defaultExtensions

	const extension = extname(file)

	if (extensionIsInList(extension, extensionsArray)) {
		return through(function write(chunk, enc, cb) {
			data += chunk
			cb()
		}, function end(cb) {
			const base = basename(file)
			const name = toPascalCase(base.replace(extension, ``))

			try {
				const {_, ...svelteOptions} = Object.assign({}, options.svelte, {
					name,
					filename: base,
					format: `cjs`,
				})
				const { js } = compile(data, svelteOptions)
				const { code, map } = js
				this.push(code)
				this.push(`\n//# sourceMappingURL=` + map.toUrl())

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
