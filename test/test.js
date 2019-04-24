const Demo = require('./Demo.html').default
const ThrowingComponent = require('./ThrowingComponent.html').default
const FileWithDashes = require('./file-with-dashes.html').default
const ReferenceSelf = require('./ReferenceSelf.html').default

const demo = new Demo({
	target: document.querySelector('#demo')
})

demo.$set({name: 'Bob'})

new FileWithDashes({
	target: document.querySelector('#fileWithDashesComponent')
})

new ReferenceSelf({
	target: document.querySelector('#referenceSelf'),
	props: {
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
