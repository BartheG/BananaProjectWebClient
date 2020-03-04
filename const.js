function loader(name, value) {
	Object.defineProperty(exports, name, {
		value: value,
		enumerable: true
	});
}
//Define port used by the app.
loader('PORT', 3030);