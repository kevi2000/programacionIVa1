<?php 
include('../../Config/Config.php');
$matricula = new matricula($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$matricula->$proceso( $_GET['matricula'] );
print_r(json_encode($matricula->respuesta));

class matricula{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($matricula){
        $this->datos = json_decode($matricula, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['cliente']['id']) ){
            $this->respuesta['msg'] = 'por favor ingrese el nombre del cliente';
        }
        if( empty($this->datos['pelicula']['id']) ){
            $this->respuesta['msg'] = 'por favor ingrese el nombre de la pelicula';
        }
        $this->almacenar_matricula();
    }
    private function almacenar_matricula(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO alquiler (idCliente,idPelicula,fechaPrestamo,fechaDevolucion,valor) VALUES(
                        "'. $this->datos['cliente']['id'] .'",
                        "'. $this->datos['pelicula']['id'] .'",
                        "'. $this->datos['fechaPrestamo'] .'",
                        "'. $this->datos['fechaDevolucion'] .'",
                        "'.$this->datos['valor'].'"
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            } else if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                    UPDATE alquiler SET
                        idCliente       = "'. $this->datos['cliente']['id'] .'",
                        idPelicula      = "'. $this->datos['pelicula']['id'] .'",
                        fechaPrestamo   = "'. $this->datos['fechaPrestamo'] .'",
                        fechaDevolucion = "'. $this->datos['fechaDevolucion'] .'",
                        valor           = "'. $this->datos['valor'].'",
                    WHERE idAlquiler = "'. $this->datos['idAlquiler'] .'"
                ');
                $this->respuesta['msg'] = 'Registro actualizado correctamente';
            }
        }
    }
    public function buscarMatricula($valor = ''){
        if( substr_count($valor, '-')===2 ){
            $valor = implode('-', array_reverse(explode('-',$valor)));
        }
        $this->db->consultas('
            select alquiler.idAlquiler, alquiler.idCliente, alquiler.idPelicula, 
                date_format(alquiler.fechaPrestamo,"%d-%m-%Y") AS fechaPrestamo, alquiler.fechaPrestamo AS f,alquiler.Devolucion, alquiler.valor
                clientes.nombre, clientes.direccion, 
                peliculas.sinopsis, peliculas.genero
            from alquiler
                inner join clientes on(clientes.idCliente=alquiler.idCliente)
                inner join pelicula on(pelicula.idPelicula=alquiler.idPelicula)
            where clientes.nombre like "%'. $valor .'%" or 
                pelicula.genero like "%'. $valor .'%" or 
                alquiler.fechaPrestamo like "%'. $valor .'%"
        ');
        $matriculas = $this->respuesta = $this->db->obtener_data();
        foreach ($matriculas as $key => $value) {
            $datos[] = [
                'idAlquiler' => $value['idAlquiler'],
                'cliente'      => [
                    'id'      => $value['idCliente'],
                    'label'   => $value['nombre']
                ],
                'pelicula'      => [
                    'id'      => $value['idPelicula'],
                    'label'   => $value['sinopsis']
                ],
                'fechaPrestamo'       => $value['f'],
                'f'         => $value['fechaPrestamo'],
                'fechaDevolucion' => $value['fechaDevolucion'],
                'valor' => $value['valor']

            ]; 
        }
        return $this->respuesta = $datos;
    }
    public function traer_periodos_alumnos(){
        $this->db->consultas('
            select peliculas.sinopsis AS label, peliculas.idPeliculas AS id
            from peliculas
        ');
        $periodos = $this->db->obtener_data();
        $this->db->consultas('
            select clientes.nombre AS label, clientes.idCliente AS id
            from clientes
        ');
        $alumnos = $this->db->obtener_data();
        return $this->respuesta = ['peliculas'=>$periodos, 'clientes'=>$alumnos ];//array de php en v7+
    }
    public function eliminarMatricula($idMatricula = 0){
        $this->db->consultas('
            DELETE matriculas
            FROM matriculas
            WHERE matriculas.idMatricula="'.$idMatricula.'"
        ');
        return $this->respuesta['msg'] = 'Registro eliminado correctamente';;
    }
}
?>