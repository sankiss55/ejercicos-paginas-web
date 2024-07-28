document.getElementById("boton").addEventListener("click", function() {
    var elemento = document.createElement("div");
    elemento.id = "redessociales";
    elemento.innerHTML = "<p id=parrafo>S H A R E</p> <img src=./img/icon-facebook.svg alt=facebook><img src=./img/icon-twitter.svg alt=facebook><img src=./img/icon-share.svg alt=share>";
    document.querySelector("main").appendChild(elemento);
});
