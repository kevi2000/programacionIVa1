var appBuscarMaterias = new Vue({
    el:'#frm-buscar-materias',
    data:{
        mismaterias:[],
        valor:''
    },
    methods:{
        buscarMateria:function(){
            fetch(`private/Modulos/materias/procesomate.php?proceso=buscarAlumno&alumno=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.mismaterias = resp;
            });
        },
        modificarMateria:function(materia){
            appmateria.materia = materia;
            appmateria.materia.accion = 'modificar';
        },
        eliminarMateria:function(idMateria){
            var opcion = confirm("¿esta seguro que decea borrarlo");
            if(opcion==true){
            fetch(`private/Modulos/materias/procesomate.php?proceso=eliminarAlumno&alumno=${idMateria}`).then(resp=>resp.json()).then(resp=>{
                this.buscarMateria();
            });}
        }
    },
    created:function(){
        this.buscarMateria();
    }
});