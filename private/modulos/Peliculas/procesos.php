<?php 
include('../../Config/Config.php');
$alumno = new alumno($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$alumno->$proceso( $_GET['alumno'] );
print_r(json_encode($alumno->respuesta));

class alumno{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($alumno){
        $this->datos = json_decode($alumno, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['descripcion']) ){
            $this->respuesta['msg'] = 'por favor ingrese la descripcion de la pelicula';
        }
        if( empty($this->datos['sinopsis']) ){
            $this->respuesta['msg'] = 'por favor ingrese la sinopsis de la pelicula';
        }
        if( empty($this->datos['genero']) ){
            $this->respuesta['msg'] = 'por favor ingrese el genero de la pelicula';
        }
        $this->almacenar_alumno();
    }
    private function almacenar_alumno(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO peliculas (descripcion,sinopsis,genero,duracion) VALUES(
                        "'. $this->datos['descripcion'] .'",
                        "'. $this->datos['sinopsis'] .'",
                        "'. $this->datos['genero'] .'",
                        "'. $this->datos['duracion'] .'"
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            } else if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                   UPDATE peliculas SET
                        descripcion     = "'. $this->datos['descripcion'] .'",
                        sinopsis     = "'. $this->datos['sinopsis'] .'",
                        genero  = "'. $this->datos['genero'] .'",
                        duracion        = "'. $this->datos['duracion'] .'"
                    WHERE idPelicula = "'. $this->datos['idPelicula'] .'"
                ');
                $this->respuesta['msg'] = 'Registro actualizado correctamente';
            }
        }
    }
    public function buscarAlumno($valor=''){
        $this->db->consultas('
            select peliculas.idPelicula, peliculas.descripcion, peliculas.sinopsis, peliculas.genero, peliculas.duracion
            from peliculas
            where peliculas.descripcion like "'.$valor.'%" or peliculas.sinopsis like "'.$valor.'%" or peliculas.genero like"'.$valor.'%"
        ');
        return $this->respuesta = $this->db->obtener_datos();
    }
    public function eliminarAlumno($idPelicula=''){
        $this->db->consultas('
            delete peliculas
            from peliculas
            where peliculas.idPelicula= "'.$idPelicula.'"
        ');
        $this->respuesta['msg'] = 'Registro eliminado correctamente';
    }
}
?>