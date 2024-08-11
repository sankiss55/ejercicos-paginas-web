let divs=document.querySelectorAll("article div");
let weekly=document.getElementById("weekly");
let monthly=document.getElementById("monthly");
let daily=document.getElementById("daily");
function informacion_de_botones(cualboton, botoncolor,boton2,boton3){
    botoncolor.classList.add("active");
    boton2.classList.remove("active");
    boton3.classList.remove("active");
    let contador=0;
axios.get("data.json").then(function(resultado){
    for (const element of resultado.data) {
       divs[contador].innerHTML=`<div id=informacion><h3>${element.title}</h3> <img src="images/icon-ellipsis.svg"></div><h1>${element.timeframes[cualboton].current}hrs</h1><p>Last Week ${element.timeframes[cualboton].previous}hrs</p>`;
    
       contador++;
    }
    }).catch(function(error){
    console.error(error);
    });
}
monthly.addEventListener("click",()=>{
    informacion_de_botones( "monthly",monthly,weekly, daily);
} );
weekly.addEventListener("click",function(){
    informacion_de_botones( "weekly",weekly, daily,monthly);
} );
daily.addEventListener("click", ()=>{
    informacion_de_botones("daily",daily,weekly,monthly);
});
window.addEventListener("load", function(){
    weekly.click();
});