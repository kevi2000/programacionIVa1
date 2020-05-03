var appBuscarAlumnos = new Vue({
    el:'#frm-buscar-clientes',
    data:{
        misclientes:[],
        valor:''
    },
    methods:{
        buscarAlumno:function(){
            fetch(`private/Modulos/clientes/procesos.php?proceso=buscarAlumno&alumno=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.misclientes = resp;
            });
        },
        modificarAlumno:function(cliente){
            appcliente.cliente = cliente;
            appcliente.cliente.accion = 'modificar';
        },
        eliminarAlumno:function(idCliente){
            var opcion = confirm("¿esta seguro que decea borrarlo");
            if(opcion==true){
            fetch(`private/Modulos/clientes/procesos.php?proceso=eliminarAlumno&alumno=${idCliente}`).then(resp=>resp.json()).then(resp=>{
                this.buscarAlumno();
            });}
        }
    },
    created:function(){
        this.buscarAlumno();
    }
});