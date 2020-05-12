<?php

$username=$_POST['user'];
$password=$_POST['pass'];

$conexion=mysqli_connect("sql309.260mb.net", "n260m_18766155", "u1w7guba", "n260m_18766155_datos");
$consulta=" SELECT * FROM registro WHERE user='$username' and pass='$password'";
$resultado=mysqli_query($conexion, $consulta);
$filas=mysqli_num_rows($resultado);
$_SESSION['user'] = $username;
if ($filas>0) {
	header("location:registro.html");
	
	
}
else {
	header("location:login.php");

}
	 	 
mysqli_free_result($resultado);
mysqli_close($conexion);

?>