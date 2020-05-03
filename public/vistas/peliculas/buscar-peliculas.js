var appBuscarDocentes = new Vue({
    el:'#frm-buscar-peliculas',
    data:{
        mispeliculas:[],
        valor:''
    },
    methods:{
        buscarDocente:function(){
            fetch(`private/Modulos/peliculas/procesos.php?proceso=buscarAlumno&alumno=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.mispeliculas = resp;
            });
        },
        modificarDocente:function(pelicula){
            apppelicula.pelicula = pelicula ;
            apppelicula.pelicula.accion = 'modificar';
        },
        eliminarDocente:function(idPelicula){
            var opcion = confirm("¿esta seguro que decea borrarlo");
            if(opcion==true){
            fetch(`private/Modulos/peliculas/procesos.php?proceso=eliminarAlumno&alumno=${idPelicula}`).then(resp=>resp.json()).then(resp=>{
                this.buscarDocente();
            });}
        }
    },
    created:function(){
        this.buscarDocente();
    }
});