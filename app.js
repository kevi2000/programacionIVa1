document.addEventListener("DOMContentLoaded", e=>{
    const form = document.querySelector("#frmConversores");
    form.addEventListener("submit", event=>{
        event.preventDefault();
  
        let de = document.querySelector("#cboDe").value,
            a = document.querySelector("#cboA").value,
            cantidad = document.querySelector("#txtCantidadConversor").value,
            opcion = document.getElementById('cboConvertir');
  
        let monedas = {
            "dolar":1,
            "colones SV":8.75,
            "yenes":111.27,
            "rupia":69.75,
            "lempira":24.36,
            "peso MX":19.36,
            "bitcoin":0.00026},

     
            longitud = {
            "metro": 1,
            "cm": 100,
            "pulgada": 39.3701,
            "pie": 3.28084,
            "varas": 1.1963081929167,
            "yardas":1.09361,
            "km":0.001,
            "millas":0.000621371};

           
  
        let $res = document.querySelector("#lblRespuesta");
        if(opcion.value == "moneda"){
        $res.innerHTML = `Respuesta: ${ (monedas[a]/monedas[de]*cantidad).toFixed(2) }`;
        } else if(opcion.value == "longitud"){
        $res.innerHTML = `Respuesta: ${ (longitud[a]/longitud[de]*cantidad).toFixed(2) }`;
        };
    });
  });
  
  function seleccionar() {
    let opcion = document.getElementById('cboConvertir'),
    de1 = document.getElementById('cboDe'),
    a1 = document.getElementById('cboA');
    de1.value="";
    a1.value="";
    de1.innerHTML="";
    a1.innerHTML="";
  
    if(opcion.value == "moneda"){
      var  array = ["dolar!Dolar","colones SV!Colones SV","yenes!Yenes","rupia!Rupia","lempira!Lempira","peso MX!Peso MX","bitcoin!Bitcoin"];
    } else if(opcion.value == "longitud"){
      var array = ["metro!Metro","cm!Cm","pulgada!Pulgada","pie!Pie","varas!Varas","yardas!Yardas","km!KM","millas!Millas"];
    };
  
    for(var i=0;i<array.length;i++){ 
      var repair = array[i].split("!");
      var newop = document.createElement("option");
      newop.value = repair[0]
      newop.innerHTML = repair[1];
      de1.options.add(newop);
    };
    for(var i=0;i<array.length;i++){ 
      var repair = array[i].split("!");
      var newop = document.createElement("option");
      newop.value = repair[0]
      newop.innerHTML = repair[1];
      a1.options.add(newop);
    };
   }