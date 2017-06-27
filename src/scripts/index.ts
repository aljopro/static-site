console.log('blah');

new Promise((resolve, reject) => {
	console.log('promise');
	resolve(true);
});

class Something {
	private foo: string;
	constructor() {
		this.foo = 'blah';
	}
}
