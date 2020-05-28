(function(){
    $(document).ready(function(){
        $('.alt-form').click(function(){
            $('.form-content').animate({
                height: "toggle",
                opacity: 'toggle'
            }, 600);
        });

        let formRegistro = document.getElementsByName('form-input');
        for (let i = 0; i < formRegistro.length; i++) {
            formRegistro[i].addEventListener('blur', function(){
                if (this.value.length >= 1) {
                    this.nextElementSibling.classList.add('active');
                    this.nextElementSibling.classList.remove('error');
                } else if (this.value.length = " ") {
                    this.nextElementSibling.classList.add('error');
                    this.nextElementSibling.classList.remove('active');
                } else {
                    this.nextElementSibling.classList.remove('active');
                }
            })
        }

    })
}())
var appRegistrarse = new Vue({

    el:'#frmRegistrarse',

    data:{

        nuevo:{

            correo  : '',
            usuario    : '',
            contraseña    : '',
            contraseña2 : '',
            accion: 'nuevo'

        }

    },
    methods:{

        guardarRegistro:function(){

            console.log(JSON.stringify(this.nuevo));
            
            if (this.nuevo.contraseña.trim()== this.nuevo.contraseña2.trim()){
                if(this.nuevo.contraseña.length >= 8){
                    fetch(`private/usuarios/usuarios.php?proceso=recibirDatos&usuarios=${JSON.stringify(this.nuevo)}`).then( resp=>resp.json() ).then(resp=>{
             
                        console.log (resp);
                        if(resp.hay>0){
                            alertify.error('Este correo ya está en uso, pruebe con otro');

                        }else{
                            alertify.success('Cuenta creada exitosamente, accediendo...'); 

                            irHome();
                        }
                        sessionStorage.setItem('correo',this.nuevo.correo);
                        sessionStorage.setItem( 'usuario',this.nuevo.usuario);
                        sessionStorage.setItem('contraseña',this.nuevo.contraseña);
        
                        
                        this.nuevo.correo = '';
                        this.nuevo.usuario = '';
                        this.nuevo.contraseña = '';
                        this.nuevo.contraseña2 = '';
                        this.nuevo.accion = 'nuevo';
        
        
                        
                      
                    });
                } else {
                    alertify.error('Contraseña insegura, Ingrese 8 o mas digitos')
                }

            } else{
                alertify.error('Las contraseñas no coinciden')
            }
        

           
          
        },

        irHome:function(){
            window.location = '/programacionIVa1/misionyvision.html';
        
        }
    }
    
});

var appLogin = new Vue({

    el: '#frmLogin',

    data:{
        login:{

            accion    : 'login',
            usuario    : '',
            contraseña    : '',
 
        }
    },

    methods:{

        validarDatosUsuario:function(){

            fetch(`private/usuarios/usuarios.php?proceso=recibirDatos&usuarios=${JSON.stringify(this.login)}`).then( resp=>resp.json() ).then(resp=>{
                console.log(resp.cont);

            if(resp.cont >0){

                alertify.success('Accediendo...');
                console.log(resp.usuario);
                console.log(resp.correo);
                sessionStorage.setItem('usuario',resp.usuario);
                sessionStorage.setItem('contraseña',resp.contraseña);
                sessionStorage.setItem('correo',resp.correo);

                irHome();
            }
            else if (resp.cont == 0){
                alertify.error('El Correo o Contraseña son incorrectos');
            }
            });
        }
    }
});

 function irHome(){
    window.location = '/programacionIVa1/misionyvision.html';
}