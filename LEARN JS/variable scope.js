function func() {
	if (true) {
		var x = 5;
		y = 6;
	}
	console.log('x = ' + x + ' and y = ' + y);
}

function func1() {
	if (true) {
		let z = 5;
	}
	console.log('z = ' + z);
}
func();
func1();