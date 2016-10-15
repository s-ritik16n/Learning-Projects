var ract = {
  
  area : function (x, y){
    return(x*y);
  },

  perimeter : function(x,y){
  	return (2*(x+y));
  }

};

function solverect(l,b){

	if(l<0 || b<0){
		console.log("invalid paramteres");
	}
	else{
		console.log("Area with l = "+l+" and b = "+" is "+ract.area(l,b));
		console.log("perimeter with l = "+l+" and b = "+" is "+ract.perimeter(l,b));
	}
}

solverect(4,5);
solverect(-1,0);
