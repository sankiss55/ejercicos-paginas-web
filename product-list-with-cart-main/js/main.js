let numero_de_productos=0;
let precio_total=0;
let array_productos_apartados_div=[];
axios.get("data.json").then(function(respuesta){
    for (const resultado of respuesta.data) {
        let elementonuevo=document.createElement("div");
        elementonuevo.className="productosactivos";
        elementonuevo.innerHTML=`<img src="${resultado.image.desktop}" alt="${resultado.image.desktop}"><button id="producto-${resultado.name}" class=agregarproducto><img src=assets/images/icon-add-to-cart.svg alt="icon-add-to-cart.svg" style="width:20%;">add to Cart</button><p>${resultado.category}</p><b>${resultado.name}</b><br><strong>$${resultado.price}</strong>`;
        let seccion1=document.getElementById("seccion1");
        seccion1.appendChild(elementonuevo);
        document.getElementById(`producto-${resultado.name}`).addEventListener("click", function(){
            
            this.style.display="none";
            var div_incrementar_disminuir_porduct=document.createElement("div");
            div_incrementar_disminuir_porduct.id=`div_increentar_disminuir_${resultado.name}`;
            div_incrementar_disminuir_porduct.classList.add('agregarproducto','reducir_aumentar_cantidad');
            div_incrementar_disminuir_porduct.innerHTML=` <button id="disminuir${resultado.name}">&minus;</button><p>1</p><button id="incrementar${resultado.name}">&plus;</button>`;
            div_incrementar_disminuir_porduct.style.backgroundColor="hsl(14, 86%, 42%)";
            document.getElementById(`producto-${resultado.name}`).parentElement.insertBefore(div_incrementar_disminuir_porduct,this);
            agregar_producto( resultado.name, resultado.price, this);
            document.getElementById(`disminuir${resultado.name}`).addEventListener("click",()=>incrementar_o_disminuircantidad(this, -1,`informacion_precio_${resultado.name}`, resultado.price,resultado.name,div_incrementar_disminuir_porduct, -resultado.price));
            document.getElementById(`incrementar${resultado.name}`).addEventListener("click",()=>{
                incrementar_o_disminuircantidad(this, +1,`informacion_precio_${resultado.name}`, resultado.price,resultado.name,div_incrementar_disminuir_porduct,+resultado.price);
            });
        });
    }
    }).catch(function(error)
    {
       // alert("error");
    });
     function agregar_producto(nombre, precio, boton_img){
        boton_img.parentElement.querySelector("img").style.border="solid hsl(14, 86%, 42%) 2px";
        hay_o_noproductos("block", "none");
        precio_total+=precio;
        var pago_total=document.getElementById("pagototal");
            pago_total.innerHTML=`<div><p>Orden Total </p><h1>$${precio_total}</h1></div><aside><img src="assets/images/icon-carbon-neutral.svg">this is a <b>carbon-natural</b> delivery</aside><button id="finalizar_pago_productos">Confirm Orden </button>`;
            document.getElementById("finalizar_pago_productos").addEventListener("click",()=>{
                finalizar_compra();
            });
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
            //punto de partida productosapartados
            let productosapartados=document.createElement("div");
            productosapartados.className="productosapartados";
            productosapartados.id=nombre;
            productosapartados.innerHTML=`<b class="nombre_producto_apartado">${nombre}</b> <p id="informacion_precio_${nombre}"><strong class="cantidad_del_producto">x1</strong> <span class="precio_unitarios"> @$${precio}</span><span  class="precio_total_producto"> $${precio}</span></p><button value=0 id="quitar-producto-${nombre}"><img src="assets/images/icon-remove-item.svg"></button><hr>`;
            var productos_apartadoshtml=document.getElementById("productos_apartados");
            productos_apartadoshtml.appendChild(productosapartados);
            document.getElementById(`quitar-producto-${nombre}`).addEventListener("click",function(){
                // accion de los botones 
               document.getElementById(`producto-${nombre}`).style.display="block";
               eliminar_producto( productosapartados.id, this.value);
               precio_total=precio_total-parseInt(document.getElementById(`disminuir${nombre}`).parentElement.querySelector("p").textContent)*precio;
               document.getElementById(`div_increentar_disminuir_${nombre}`).remove();
               document.querySelector("#pagototal div h1").textContent="$"+precio_total;
            });
        }
        array_productos_apartados_div.push(nombre);
        document.getElementById("no-productos-apartados").style.display="none";
       
     }
     function eliminar_producto(elemeto, boton){
        
        
        document.getElementById(`producto-${elemeto}`).parentElement.querySelector("img").style.border="";
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
     function incrementar_o_disminuircantidad(boton_incrementar,signo, id_info_precio_producto_aprtado,precio_c_u, nombre_producto, div_incrementar_disminuir_porduct, precio_incremento_menos){
        
        precio_total=precio_total+parseFloat(precio_incremento_menos);
        document.querySelector("#pagototal div h1").textContent="$"+precio_total;
        
        let cantidad_incremento_producto=boton_incrementar.parentElement.querySelector("p");
        let respuesta=(parseInt(cantidad_incremento_producto.textContent)+signo>0)?(parseInt(cantidad_incremento_producto.textContent)+signo):(document.getElementById(`producto-${nombre_producto}`).style.display="block",div_incrementar_disminuir_porduct.remove(), eliminar_producto(nombre_producto,2), (document.getElementById("productos_apartados").children.length==0)?(
            hay_o_noproductos("none", "block")):(0) );
         cantidad_incremento_producto.innerHTML=respuesta>0?respuesta:0;
        let info_parrafo_producto_apartado=parseInt(boton_incrementar.parentElement.querySelector("p").textContent);
        document.getElementById(id_info_precio_producto_aprtado).innerHTML=`<strong class="cantidad_del_producto">x`+info_parrafo_producto_apartado+`</strong> <span class="precio_unitarios">@$${precio_c_u}</span><span class="precio_total_producto">$${precio_c_u*info_parrafo_producto_apartado} </span>`;
     }
     function finalizar_compra(){
        var div_pago = document.createElement("div");
        div_pago.id = "div_pago_final";
        div_pago.innerHTML = `<img src="assets/images/icon-order-confirmed.svg" ><h1>Orden Confimed</h1><p>We open you enjoy your food!</p><div id="productosadquiridos"></div><button id="reiniciar_programa">Start New Orden </button>`;
        
        document.body.appendChild(div_pago);
        
        document.getElementById("reiniciar_programa").addEventListener("click", function(){
            window.location.reload();
                    });
        var main = document.querySelector("main");
        main.style.opacity = "0.3";
        let productos_adquiridos=document.getElementById("productosadquiridos");
        let todos_los_productos_apartados=document.getElementsByClassName("productosapartados");
        let nombre_producto_apartado=document.getElementsByClassName("nombre_producto_apartado");
        let cantidad_del_producto=document.getElementsByClassName("cantidad_del_producto");
        let precio_unitario=document.getElementsByClassName("precio_unitarios");
        let precio_total_producto=document.getElementsByClassName("precio_total_producto");
        for(let i=0;i<nombre_producto_apartado.length;i++){
            let img="";
            axios.get("data.json").then(function(respuesta){
for (const element of respuesta.data) {
    if(nombre_producto_apartado[i].textContent==element.name){
         img=element.image.thumbnail;
         break;
    }
}
const div=document.createElement("div");
div.classList.add("divs_productos_compra_final");
div.innerHTML=`<div><img src="${img}"></div><div>${nombre_producto_apartado[i].textContent}<span>${cantidad_del_producto[i].textContent}<p>${precio_unitario[i].textContent}</p></span></div><div>${precio_total_producto[i].textContent}</div>`;
productos_adquiridos.appendChild(div);
            }).catch(function(error){
console.log(error);
            });
           
           
        }
        productos_adquiridos.innerHTML=productos_adquiridos.innerHTML+"<div id=pagos><p>orden total</p> <h1>$"+precio_total+"</h1></div>";
        
        //style="width:20%;"
    }