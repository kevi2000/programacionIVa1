document.addEventListener("DOMContentLoaded", e=>{
    const form = document.querySelector("#frmSaludo");
    form.addEventListener("submit", event=>{
        event.preventDefault();
        let vlor = document.querySelector("#txtDatos").value, dtos = vlor.split(',').sort(compararnum)
        let $resp = Moda(dtos);
        if($resp.length!=0){
        document.getElementById("lblSaludo").innerHTML=`La Moda es: ${($resp)}`;
      }else{
        document.getElementById("lblSaludo").innerHTML="los numeros se repiten una vez";
      }
  
    });
  });
  //encontrar-mediana
  function mediana(serie=[]) {
    //obtener y ordenar datos
    let vlor = document.querySelector("#txtDatos").value, dtos = vlor.split(',').sort(compararnum), mediana = 0;
    //convertir de cadena a entero
    for (i = 0; i < dtos.length; i++) {
      dtos[i] = parseInt(dtos[i]);
    }
    //calcular mediana
    if (dtos.length % 2 == 0) {
      mediana = (dtos[Math.round((dtos.length / 2) - 1)] + dtos[Math.round(dtos.length / 2)]) / 2;
      return document.querySelector("#lblSaludo").innerHTML = `La mediana es: mediana ${(mediana)}`;
    }
    else {
      mediana = dtos[Math.round((dtos.length / 2) - 1)];
      return document.querySelector("#lblSaludo").innerHTML = `la mediana es: ${(mediana)}`;    
    }
  }
  //encontrar moda
  function Moda(serie=[]){
  let repetidos = [];
   let temporal = [];
    
    serie.forEach((value,index)=>{
      temporal = Object.assign([],serie); //Copiado de elemento
      temporal.splice(index,1); //Se elimina el elemnto q se compara
      /**
       * Se busca en temporal el elemento, y en repetido para 
       * ver si esta ingresado al array. indexOf returna
       * -1 si el elemento no se encuetra
       **/
      if(temporal.indexOf(value)!=-1 && repetidos.indexOf(value)==-1) {
         repetidos.push(value);}
    });
    return repetidos;
  }
  //odenar-datos
  function compararnum(a, b) {
    return a - b;
  }
  //encontrar-media aritmetica
  function media(){
    let vlor = document.querySelector("#txtDatos").value, dtos = vlor.split(',').sort(compararnum), media = 0;
    for (i = 0; i < dtos.length; i++) {
      dtos[i] = parseInt(dtos[i]);
      media = media + dtos[i]
    }
    document.querySelector("#lblSaludo").innerHTML = `La media aritmetica es: ${(media/dtos.length)}`;
  }
  //desviacion-tipica
  function desviacion_tipica(serie=[]){
  let vlor = document.querySelector("#txtDatos").value, dtos = vlor.split(",").sort(compararnum), des_tip = 0;
  des_tip = Varinza_muestral(dtos);
  document.querySelector("#lblSaludo").innerHTML = `La desviacion tipica es: ${(Math.sqrt(des_tip))}`;
  return des_tip;
  }
  //encontrar Varinza muestral
  function Varinza_muestral(serie=[]){
    let dtos = document.querySelector("#txtDatos").value, vlor = dtos.split(",").sort(compararnum),
    VarM = 0,sumaCuno=0,sumaDtodos=0,a = vlor.length,suma = 0;
  
  for(i=0;i< vlor.length;i++){
    vlor[i]= parseInt(vlor[i]);
    suma = suma + vlor[i];
    sumaCuno = sumaCuno+Math.pow(vlor[i],2);
  }
  sumaDtodos = Math.pow(suma,2);
  VarM = (a*sumaCuno - sumaDtodos)/(a*(a-1));
  document.querySelector("#lblSaludo").innerHTML = `Varianza muestral es: ${(VarM)}`;
  return VarM;
  }
  //encontrar media Armonica
  function media_Armonica(serie=[]){
    let vlor = document.querySelector("#txtDatos").value, dtos = vlor.split(",").sort(compararnum), mediaArm = 0,a = 0,suma=0;
    for(i=0;i < dtos.length;i++){
      dtos[i] = parseInt(dtos[i]);
      suma = suma+ 1/dtos[i];
    }
    mediaArm = dtos.length/suma;
    document.querySelector("#lblSaludo").innerHTML = `la media armonica es: ${(mediaArm)}`;
    return mediaArm;
  }