var $ = el => document.querySelector(el), frmAlumnos = $("#frmDocentes");

frmAlumnos.addEventListener("submit", e => {

    e.preventDefault();
    e.stopPropagation();

    let alumnos = {
        accion    : 'nuevo',
        nombre    : $("#txtNombreDocente").value,
        direccion : $("#txtDireccionDocente").value,
        telefono  : $("#txtTelefonoDocente").value
    };

    fetch(`/programacionIV_A1Clase/private/Modulos/Alumnos/procesosDo.php?proceso=recibirDatos&docente=${JSON.stringify(alumnos)}`).then( resp=>resp.json() ).then(resp=>{
        $("#respuestaAlumno").innerHTML = `
            <div class="alert alert-success" role="alert">
                ${resp.msg}
            </div>
        `;
    }); 
});