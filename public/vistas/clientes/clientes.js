
var appcliente = new Vue({
    el:'#frm-clientes',
    data:{
        cliente:{
            idCliente  : 0,
            accion    : 'nuevo',
            nombre    : '',
            direccion : '',
            telefono  : '',
            dui       : '',
            msg       : ''
        }
    },
    methods:{
        guardarAlumno:function(){
            fetch(`private/Modulos/clientes/procesos.php?proceso=recibirDatos&alumno=${JSON.stringify(this.cliente)}`).then( resp=>resp.json() ).then(resp=>{
                this.cliente.msg = resp.msg;
                this.cliente.idCliente = 0;
                this.cliente.nombre = '';
                this.cliente.direccion = '';
                this.cliente.telefono = '';
                this.cliente.dui = '';
                this.cliente.accion = 'nuevo';
                appBuscarAlumnos.buscarAlumno();
            });
        }
    }
});