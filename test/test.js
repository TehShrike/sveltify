const Demo = require('./Demo.html')
const ThrowingComponent = require('./ThrowingComponent.html')

const demo = new Demo({
	target: document.querySelector('#demo')
})

demo.set({
	name: 'Bob'
})

const throwingComponent = new ThrowingComponent({
	target: document.querySelector('#throwingComponent')
})

