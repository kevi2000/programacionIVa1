Vue.component('v-select', VueSelect.VueSelect);

var appalquiler = new Vue({
    el:'#frm-alquiler',
    data:{
        alquiler:{
            idAlquiler : 0,
            accion    : 'nuevo',
            cliente   : {
                idCliente : 0,
                cliente   : ''
            },
            pelicula    : {
                idPelicula : 0,
                pelicula   : ''
            },
            fechaPrestamo    : '',
            fechaDevolucion : '',
            valor : '',
            msg       : ''
        },
        cliente : {},
        pelicula  : {}
    },
    methods:{
        guardarMatriculas(){
            fetch(`private/Modulos/alquiler/procesos.php?proceso=recibirDatos&matricula=${JSON.stringify(this.alquiler)}`).then( resp=>resp.json() ).then(resp=>{
                this.alquiler.msg = resp.msg;
            });
        },
        limpiarMatriculas(){
            this.alquiler.idAlquiler=0;
            this.alquiler.accion="nuevo";
            this.alquiler.msg="";
        }
    },
    created(){
        fetch(`private/Modulos/alquiler/procesos.php?proceso=traer_periodos_alumnos&matricula=''`).then( resp=>resp.json() ).then(resp=>{
            this.cliente = resp.cliente;
            this.pelicula = resp.pelicula;
        });
    }
});