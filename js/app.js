

function obtenerSesion(){

    var nombreUsuario = sessionStorage.getItem('usuario');
    return (nombreUsuario ===null || nombreUsuario === undefined)?window.location='/programacionIVa1/login1.html':false;
    
}

function cerrarSesion(){
    alertify.confirm('Alerta', '¿Está seguro de cerrar esta sesión?',function(){
        
        sessionStorage.clear();
        window.location = '/programacionIVa1/login1.html';
        
    }, function() {
        alertify.error('Cancelado');
        
    });
}

function obtenerDatosSesion(){
    var nombreUsuario = sessionStorage.getItem('usuario');
    var contraUsuario = sessionStorage.getItem('contraseña');
    var correoUsuario = sessionStorage.getItem('correo');
    console.log(nombreUsuario,   contraUsuario, correoUsuario);

    alertify.success('Bienvenido, '+nombreUsuario);
    //document.getElementById('nombrecargoUsu').innerHTML=''+nombreUsuario+', '+cargoUsuario;
    
}


document.addEventListener('DOMContentLoaded', e => {

    obtenerSesion();
    obtenerDatosSesion();
   //validarCargo();


})

var socket = io.connect("http://localhost:3001",{'forceNew':true}),
mensaje = document.querySelector('#inputMsg'),
revMesg = [],   
 appchat = new Vue({
        el:'#frmChat',
        data:{

            msg : '',

        },
        methods:{
            enviarMensaje(){
                if (!document.querySelector('#inputMsg').value.trim() == ''){
                    var  envMesg  =
                    {
                        user: sessionStorage.getItem('usuario'),
                        msg:  document.querySelector('#inputMsg').value.trim(),

                    };
                    socket.emit('enviarMensaje', envMesg);
                    console.log(envMesg);
                    socket.emit('historial');
                    envMesg.user = '';
                    envMesg.msg = '';
                    document.querySelector('#inputMsg').value = ''; 
                }

            },

        },
        created(){
            socket.emit('historial');
        }
    });
   socket.on('recibirMensaje',msg=>{
        revMesg = msg;
        console.log(msg);
    });

    
        socket.on('historial',msgs=>{
            
            var contenido = document.querySelector('#contenidoChat');
            contenido.innerHTML='';
             revMesg = [];
             console.log(msgs);
             console.log('trae')
             console.log(contenido);
            msgs.forEach(item => {
                
                if (sessionStorage.getItem('usuario')===item.user){
                   contenido.innerHTML += `
                   
                   <span class="badge badge-success  useer" style= "margin-top: 5px; float: right;">  ${item.msg}  <small class="user"> ${item.user } </small></span> <br>
                   `
                    
                } else{
                    contenido.innerHTML += `
                    <span class="badge badge-primary useer" style= "margin-top: 5px;"> <small class="user">  ${item.user } </small>${item.msg} </span> <br>
                    `
                }
                contenido.scrollTop = contenido.scrollHeight;
            });
        });
    
