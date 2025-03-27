
    
   let  div_product_popul_container= document.getElementById("div_product_popul_container");

    var all_img_select=document.querySelectorAll('.img_selct');
    var img_selct_popul=document.querySelectorAll('.img_selct_popul');
    img_view_content(all_img_select, 'img_view');
    img_view_content(img_selct_popul, 'img_view_popul');
    var p_cantidad=document.getElementById("cantidad");
    document.getElementById("add").addEventListener("click", function(){
        
        agregar_carrito();
    });
    var info_compra_span=document.querySelector('#info_compra span');
   var produc_apartado=document.querySelectorAll('.produc_apartado');
   var text_empty=document.getElementById("text_empty"); 
   function verificar_cantidad(cantidad){
        if(cantidad>0)
        {
            borrar_datos('block', 'none');
           
           
        }else{
            borrar_datos('none', 'block');
           
        }
        
        info_compra_span.innerHTML=''+cantidad;
    }
    document.addEventListener('click', function(e)
{
    if(!document.getElementById("ventana_cart").contains(e.target)){
        if(window.getComputedStyle(document.getElementById("ventana_cart")).display=='block'){
            document.getElementById("ventana_cart").style.display='none';
        }
    }
  
    
    });
    function ver_carrito(){
       setTimeout(() => {
         
        if( window.getComputedStyle(document.getElementById("ventana_cart")).display=='none'){
            document.getElementById("ventana_cart").style.display='block';
        }else{
            document.getElementById("ventana_cart").style.display='none';
        }
       }, 100);
    }
    function borrar_datos(tipo1, tipo2, botton){
        if(botton==true){
p_cantidad.innerHTML='0';
        }else{
            document.getElementById("span_cantidad").innerHTML='$125.00 x '+p_cantidad.textContent+'  <b>$'+parseInt(p_cantidad.textContent)*125+'</b>';
        }
        info_compra_span.style.display=tipo1;
        for (let index = 0; index < produc_apartado.length; index++) {
            const element = produc_apartado[index];
            element.style.display=tipo1;
        }
        text_empty.style.display=tipo2;
    }
    function disminuir_carrito(){
        p_cantidad.innerText=parseInt(p_cantidad.textContent)>0?parseInt(p_cantidad.textContent)-1:'0';
        verificar_cantidad(parseInt(p_cantidad.textContent));
    }
    function agregar_carrito(){
        p_cantidad.innerText=parseInt(p_cantidad.textContent)+1;
        verificar_cantidad(parseInt(p_cantidad.textContent));
    }
var div_product_container=document.getElementById("div_product_container");
div_product_container.addEventListener("click", function(){
    div_product_popul_container.style.display='flex';
    document.getElementById("img_view_popul").src=document.getElementById("img_view").src;
    activivar_opcacidity(img_selct_popul);
    for (let index = 0; index < img_selct_popul.length; index++) {
        const element = img_selct_popul[index];
        if(element.src==document.getElementById("img_view").src){
            element.style.opacity='0.6';
            break;
        }
    }
});
var div_product_popul_container_close=document.querySelector('#div_product_popul_container button');
div_product_popul_container_close.addEventListener("click", function(){
    div_product_popul_container.style.display='none';
});

function cambiar_img_menos(img_selcts, img_views){
    //let img_view_popul=document.getElementById("img_view_popul");
    let img_view=document.getElementById(img_views);
    let img_selct=document.querySelectorAll(img_selcts);
    //let img_selct_popul=document.querySelectorAll('.img_selct_popul');
    for (let index = 0; index < img_selct.length; index++) {
        const element = img_selct[index];
        if(element.src==img_view.src){
            img_view.src=img_selct[index-1]?img_selct[index-1].src : img_selct[img_selct.length-1].src;
            activivar_opcacidity(img_selct);
            img_selct[index-1]?img_selct[index-1].style.opacity='0.6': img_selct[img_selct.length-1].style.opacity='0.6';
            
            break;
        }
    }
}

function cambiar_img(img_selcts, img_views){
    let img_view_popul=document.getElementById(img_views);
    let img_selct_popul=document.querySelectorAll(img_selcts)
    for (let index = 0; index < img_selct_popul.length; index++) {
        const element = img_selct_popul[index];
        if(element.src==img_view_popul.src){
            img_view_popul.src=img_selct_popul[index+1]?img_selct_popul[index+1].src:img_selct_popul[0].src;
            activivar_opcacidity(img_selct_popul);
            img_selct_popul[index+1]?img_selct_popul[index+1].style.opacity='0.6':img_selct_popul[0].style.opacity='0.6';
            
            break;
        }
    }
}
function activivar_opcacidity(imagenes){
    for (let index = 0; index < imagenes.length; index++) {
        const element = imagenes[index];
        element.style.opacity='1';
    }
}
function img_view_content(imagenes,contenedor){
    for (let index = 0; index < imagenes.length; index++) {
        const element = imagenes[index];
        element.addEventListener("click", function () {
            let img_view=document.getElementById(contenedor);
            img_view.src=this.src;
            activivar_opcacidity(imagenes);
            this.style.opacity='0.6';
    
        })
    }
}

