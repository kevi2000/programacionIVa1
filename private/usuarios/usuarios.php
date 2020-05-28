<?php
 
    include('../config/config.php');

    $usuarios = new usuarios($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $usuarios->$proceso($_GET['usuarios']);
 
    print_r(json_encode($usuarios->respuesta));


    class usuarios{

        private $datos = array(), $db;
        public $respuesta = 'correcto';

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($usuarios){

            $this->datos = json_decode($usuarios, true);
            $this->usuarioss();

        }


        private function usuarioss(){

            if ($this->datos['accion']=='nuevo'){

                $this->db->consultas('SELECT * FROM usuarios WHERE correo = "'.$this->datos['correo'].'"');
                $existe = $this->db->obtener_data();
                $contt = count($existe);

                if($contt>0){
                    $this->respuesta= ['hay'=>$contt];
                }else{
                    $this->db->consultas('INSERT INTO usuarios (correo, usuario, contraseña) VALUES("'.$this->datos['correo'].'", "'.$this->datos['usuario'].'", "'.$this->datos['contraseña'].'")');
                    $this->respuesta= ['hay'=>$contt];
                }
            
                }
                else{
                  

                        $this->db->consultas('SELECT * FROM usuarios WHERE correo = "'.$this->datos['correo'].'" AND contraseña = "'. $this->datos['contraseña'].'"');
                        $UsuarioActual = $this->db->obtener_data();
                        $cont = count($UsuarioActual);
                        $imprimirUsuario = [];
                        $imprimirCorreoUsuario = [];
                        $imprimirPassUsuario = [];


                        for ($i=0; $i < count($UsuarioActual); $i++) { 
                            $imprimirUsuario[] = $UsuarioActual[$i]['usuario'];
                            $imprimirCorreoUsuario[] = $UsuarioActual[$i]['correo'];
                            $imprimirPassUsuario[] = $UsuarioActual[$i]['contraseña'];

                        }
                        // echo json_encode($imprimirAgregarServicios);
            
                            return $this->respuesta = ['usuario'=>$imprimirUsuario, 'correo'=>$imprimirCorreoUsuario, 'contraseña'=>$imprimirPassUsuario, 'cont'=>$cont];//array de php en v7+

                }
                
        }

     
    }
?>