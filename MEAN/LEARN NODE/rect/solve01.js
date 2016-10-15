var rect = require('./rectmod')

function solverect(l,b){
	if(l<0 || b<0){
		console.log("Invalid parameters");
	}
	else{
		console.log("area = "+rect.area(l,b));
	}
}

solverect(-1,2);
solverect(4,3);
