const Demo = require('./Demo.html')
const ThrowingComponent = require('./ThrowingComponent.html')
const FileWithDashes = require('./file-with-dashes.html')
const ReferenceSelf = require('./ReferenceSelf.html')

const demo = new Demo({
	target: document.querySelector('#demo')
})

demo.set({
	name: 'Bob'
})

new FileWithDashes({
	target: document.querySelector('#fileWithDashesComponent')
})

new ReferenceSelf({
	target: document.querySelector('#referenceSelf'),
	data: {
		items: [{
			label: 'parent',
			children: [{
				label: 'child'
			}]
		}]
	}
})

new ThrowingComponent({
	target: document.querySelector('#throwingComponent')
})
