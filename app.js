document.addEventListener("DOMContentLoaded", (event) =>{
    const formAlumnos = document.querySelector("#frmAlumno");
    formAlumnos.addEventListener("submit", (e)=>{
        e.preventDefault(); 
        let codigo = document.querySelector("#txtCodigoAlumno").value,
            nombre =document.querySelector("#txtNombreAlumno").value,
            direccion =document.querySelector("#txtDireccionAlumno").value,
            telefono =document.querySelector("#txtTelefonoAlumno").value;

            var codigos = "codigo"+codigo;
            var nombres = "nombre"+codigo;
            var direcciones = "direccion"+codigo;
            var telefonos = "telefono"+codigo;
            
        if( 'localStorage' in window  ){
            window.localStorage.setItem(codigos, codigo);
            window.localStorage.setItem(nombres, nombre);
            window.localStorage.setItem(direcciones, direccion);
            window.localStorage.setItem(telefonos, telefono);
        } else {
            alert("almacenamiento en local NO soportado!!! Actualizate!");
        }
    });
    document.querySelector("#btnRecuperarAlumnos").addEventListener("click", (e) => {
        if( 'localStorage' in window ){
            let Codigo = document.querySelector("#txtCodigoAlumno").value;
            if(Codigo != ""){
            document.querySelector("#txtCodigoAlumno").value = window.localStorage.getItem("codigo"+Codigo);
            document.querySelector("#txtNombreAlumno").value = window.localStorage.getItem("nombre"+Codigo);
            document.querySelector("#txtDireccionAlumno").value = window.localStorage.getItem("direccion"+Codigo);
            document.querySelector("#txtTelefonoAlumno").value = window.localStorage.getItem("telefono"+Codigo);
        }  
        else {
            alert("almacenamiento en local NO soportado!!! Actualizate!");
        } 
    }
    else {
alert("error al recuperar")
    }
    });
});

/*document.addEventListener("DOMContentLoaded",init);*/

/*document.addEventListener("DOMContentLoaded",function(event){
    alert("Pagina cargo forma 2");
});*/

/*function init(event){
    alert("Hola la pagina a cargado");
}*/