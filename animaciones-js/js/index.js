window.addEventListener("scroll", function(){
    console.log( "1"+document.documentElement.clientHeight);
    console.log("2"+window.innerHeight);
var altura_ventana =window.innerHeight;
var imagen=document.getElementById("imagen").getBoundingClientRect().top;
if(imagen<altura_ventana){
   var imagen= document.getElementById("imagen");
   imagen.style.display="none";
}
});