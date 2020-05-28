
var apppelicula = new Vue({
    el:'#frm-peliculas',
    data:{
        pelicula:{
            idPelicula  : 0,
            accion      : 'nuevo',
            descripcion : '',
            sinopsis    : '',
            genero      : '',
            duracion    : '',
            msg         : ''
        }
    },
    methods:{
        guardarDocente:function(){
            fetch(`private/Modulos/peliculas/procesos.php?proceso=recibirDatos&alumno=${JSON.stringify(this.pelicula)}`).then( resp=>resp.json() ).then(resp=>{
                this.pelicula.msg = resp.msg;
                this.pelicula.idPelicula = 0;
                this.pelicula.descripcion = '';
                this.pelicula.sinopsis = '';
                this.pelicula.genero = '';
                this.pelicula.duracion = '';
                this.pelicula.accion = 'nuevo';
                appBuscarDocentes.buscarDocente();
            });
        }
    }
});