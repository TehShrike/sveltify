const Demo = require('./Demo.html')
const ThrowingComponent = require('./ThrowingComponent.html')
const FileWithDashes = require('./file-with-dashes.html')

const demo = new Demo({
	target: document.querySelector('#demo')
})

demo.set({
	name: 'Bob'
})

new FileWithDashes({
	target: document.querySelector('#fileWithDashesComponent')
})

new ThrowingComponent({
	target: document.querySelector('#throwingComponent')
})
