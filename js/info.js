var pcont = document.getElementById("pcontact");
var scont = document.getElementById("scontact");
var submit = document.getElementsByTagName("button");


var checkContact = function(){
  if(pcont.value == scont.value)
  {
    scont.style.color="red";
    submit[0].disabled = true;
    submit[0].style.backgroundColor="Silver";
    submit[0].style.borderColor="Silver";
  }
  else {
    scont.style.color="black";
    submit[0].disabled = false;
    submit[0].style.backgroundColor="";
    submit[0].style.borderColor="";
  }
}
scont.addEventListener("keyup",checkContact);
