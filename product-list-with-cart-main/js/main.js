let numero_de_productos=0;
let precio_total=0;
let array_productos_apartados_div=[];
axios.get("data.json").then(function(respuesta){
    for (const resultado of respuesta.data) {
        let elementonuevo=document.createElement("div");
        elementonuevo.className="productosactivos";
        elementonuevo.innerHTML=`<img src="${resultado.image.desktop}" alt="${resultado.image.desktop}"><button id="producto-${resultado.name}" class=agregarproducto><img src=assets/images/icon-add-to-cart.svg alt="icon-add-to-cart.svg" style="width:20%;">add to Cart</button><p>${resultado.category}</p><b>${resultado.name}</b><br><strong>$${resultado.price}.00</strong>`;
        let seccion1=document.getElementById("seccion1");
        seccion1.appendChild(elementonuevo);
        let boton =document.getElementById(`producto-${resultado.name}`);
        boton.addEventListener("click", function(){
            this.style.display="none";
            var div_incrementar_disminuir_porduct=document.createElement("div");

            div_incrementar_disminuir_porduct.classList.add('agregarproducto','reducir_aumentar_cantidad');
            div_incrementar_disminuir_porduct.innerHTML=` <button id="disminuir${resultado.name}">&minus;</button><p>1</p><button id="incrementar${resultado.name}">&plus;</button>`;
            div_incrementar_disminuir_porduct.style.backgroundColor="hsl(14, 86%, 42%)";
            document.getElementById(`producto-${resultado.name}`).parentElement.insertBefore(div_incrementar_disminuir_porduct,this);
            agregar_producto( resultado.name, resultado.price);
            document.getElementById(`disminuir${resultado.name}`).addEventListener("click",()=>incrementar_o_disminuircantidad(this, -1));
            document.getElementById(`incrementar${resultado.name}`).addEventListener("click",()=>incrementar_o_disminuircantidad(this, +1));
        });
    }
    }).catch(function(error)
    {
        alert("error");
    });
     function agregar_producto(nombre, precio){

        hay_o_noproductos("block", "none");
        precio_total+=precio;
        var pago_total=document.getElementById("pagototal");
            pago_total.innerHTML=`<div><p>Orden Total </p><h1>$${precio_total}</h1></div><aside><img src="assets/images/icon-carbon-neutral.svg">this is a <b>carbon-natural</b> delivery</aside><button>Confirm Orden </button>`;
        numero_de_productos++;
       
        document.querySelector("#seccion2 h3").innerHTML=`Your Cart (${numero_de_productos})`;
let producto_ya_agregado=false;
        for(var i=0; i<array_productos_apartados_div.length;i++){
if(array_productos_apartados_div[i]==nombre){
    producto_ya_agregado==true;
    return;
}
        }
        if(producto_ya_agregado==false){
            let productosapartados=document.createElement("div");
            productosapartados.className="productosapartados";
            productosapartados.id=nombre;
            productosapartados.innerHTML=`<b>${nombre}</b> <p><strong>${precio}</strong>  @$${precio}<b></b>$${precio*2}</p><button value=0 id="quitar-producto-${nombre}"><img src="assets/images/icon-remove-item.svg"></button><hr>`;
            var productos_apartadoshtml=document.getElementById("productos_apartados");
            productos_apartadoshtml.appendChild(productosapartados);
            document.getElementById(`quitar-producto-${nombre}`).addEventListener("click",function(){
                eliminar_producto( productosapartados.id, this.value) 
            });
        }
        array_productos_apartados_div.push(nombre);
        document.getElementById("no-productos-apartados").style.display="none";
       
     }
     function eliminar_producto(elemeto, boton){
        document.getElementById(elemeto).remove();
        document.querySelector("#seccion2 h3").innerHTML=`Your Cart (${numero_de_productos-boton})`;
        const index =array_productos_apartados_div.indexOf(elemeto);

// Verificar si el valor está en el array
if (index !== -1) {
    // Eliminar el elemento del array
    array_productos_apartados_div.splice(index, 1);
}
if(document.getElementById("productos_apartados").children.length==0)
    {
        hay_o_noproductos("none", "block");
        return 
    }
     }
     function hay_o_noproductos(display_productos,display_no_hay_productos){
        
        document.getElementById("pagototal").style.display=display_productos;
        document.getElementById("productos_apartados").style.display=display_productos;
        document.getElementById("no-productos-apartados").style.display=display_no_hay_productos;
     }
     function incrementar_o_disminuircantidad(boton_incrementar,signo){
        boton_incrementar.parentElement.querySelector("p").innerHTML= parseInt(boton_incrementar.parentElement.querySelector("p").textContent)+signo==0?"hola":parseInt(boton_incrementar.parentElement.querySelector("p").textContent)+signo;
     }
    