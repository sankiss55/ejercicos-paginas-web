

let main=document.querySelector("main");
document.getElementById("hola").addEventListener("click", function(evento){
    evento.preventDefault();
let correo=document.querySelector("input").value;
let formato=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!formato.test(correo)){
    let input=document.querySelector("input");
    input.style.border="solid red 1px";
    input.style.backgroundColor="rgba(255, 175, 175, 0.8)";
    let label=document.querySelector("label");
    label.classList.add("error");
    input.placeholder="ash#loremcompany.com";
    return;
}
main.style.gridTemplateColumns="1fr";
main.style
main.style.gap="20px";
main.style.width="35%";
if(window.innerWidth<=400){
    
main.style.width="100%";

main.style.height="100vh";
}else{
    main.style.width="35%";
}
main.style.padding="30px";
main.innerHTML="<img src=images/icon-success.svg><h1>Thanks for subcribinng!</h1><p>A confirmation email has been set to<strong> ash@loremcompany.com</strong> Please open it and click the button inside to confirm your subcription</p><button id=reiniciar_programa>Dismiss message</button>";
document.getElementById("reiniciar_programa").addEventListener("click", function(){
document.location.reload();
});
});
window.addEventListener("load", evento_ventana);
window.addEventListener("resize",evento_ventana );
function evento_ventana(){
if(window.innerWidth<=400){
    document.querySelector("div img").src="images/illustration-sign-up-mobile.svg";
    main.style.padding=0;
    }else{
        document.querySelector("div img").src="images/illustration-sign-up-desktop.svg";
    }

}