var li = document.getElementsByClassName('link');

for(var i = 0;i<li.length;i++){
    li[i].addEventListener("mouseover",function(){
      //this.style.fontWeight="bold";
      this.style.color="white";

    });
    li[i].addEventListener("mouseout",function(){
      this.style.fontWeight="";
      this.style.color="";
    })
}
