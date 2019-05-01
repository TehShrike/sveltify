const { basename, extname } = require(`path`)
const { compile } = require(`svelte/compiler`)
const through = require(`through2`)
const toPascalCase = require(`just-pascal-case`)
const MagicString = require(`magic-string`)

const defaultExtensions = [ `.html`, `.svelte` ]

const sourceAndMap = (source, mapUrl) => `${ source }\n//# sourceMappingURL=${ mapUrl }`

const TO_REPLACE = `exports.default = `

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
				const svelteOptions = Object.assign({}, options.svelte, {
					name,
					filename: base,
					format: `cjs`,
				})
				delete svelteOptions._

				const { js } = compile(data, svelteOptions)
				const { code } = js

				const magic = new MagicString(code, {
					filename: base,
				})

				const overwriteStart = code.indexOf(TO_REPLACE)

				if (overwriteStart !== -1) {
					const overwriteEnd = overwriteStart + TO_REPLACE.length
					magic.overwrite(overwriteStart, overwriteEnd, `module.exports = `)
				}

				this.push(
					sourceAndMap(
						magic.toString(),
						magic.generateMap({
							source: file,
						}).toUrl()
					)
				)

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
