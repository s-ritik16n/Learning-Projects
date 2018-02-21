
var submit = document.getElementsByTagName('button');
var pass = document.getElementById('password');
var pass1 = document.getElementById('password1');
var username = document.getElementById("username");
var msg = document.getElementById("msg");
var msgs=[];

var exceptions={
  usernameEx : "username can only begin with alphanumeric characters(A-Z,a-z,0-9).",
  passwordEx : "Password Mismatch..!!"
};

//functions
var alert = function(errorString,from){
  if(errorString.toString() != ""){
    if(msgs.indexOf(errorString.toString()) == -1){
      msgs.push(errorString.toString());
    }
  }
  else if(errorString.toString() == ""){
    if(from == 1){
      console.log("Entered from = 1");
      var index = msgs.indexOf(exceptions.usernameEx);
      if(index == msgs.length-1){
        console.log(true);
      }
      if(index != -1){
        for(var i = index;i<msgs.length-1;i++){
            msgs[i] = msgs[i+1];
          }
          msgs.pop();
        }
      }
    else if(from == 0){
      console.log("Entered from = 0");
      var index = msgs.indexOf(exceptions.passwordEx);
      if(index != -1){
        for(var i = index;i<msgs.length-1;i++){
          msgs[i] = msgs[i+1];
        }
        msgs.pop();
      }
    }
  }
  displayError();
}

var checkEqual = function(){
  if(pass.value != pass1.value){
    pass1.style.color="red";
    alert(exceptions.passwordEx,0);
  }else {
    alert("",0);
    pass1.style.color="";
  }
}
var checkValue = function(){
  if(username.value.match(/^(&|<|_|\^|\(|#|%|\)|'|,|\.|\/|!|-|@|\$|\?|\\|\|)/)){
    username.style.color="red";
    alert(exceptions.usernameEx,1);
  }else {
    alert("",1);
    username.style.color="";
  }
}

var displayError = function(){
  if(msgs.length>0){
    console.log("msgs = "+msgs.toString())
    msg.innerHTML = msgs.join("<br>");
    submit[1].disabled=true;
  }
  else {
    msg.innerHTML = msgs.join("<br>");
    submit[1].disabled=false;
  }
}

//event listeners
pass1.addEventListener("keyup",checkEqual);
username.addEventListener("keyup",checkValue);
pass.addEventListener("keyup",function(){
  if(pass1.value != ""){
    checkEqual();
  }
});
