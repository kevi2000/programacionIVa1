<?php
include ("conexion.php");
    if(isset($_POST['usuario'])) && !empty($_POST['usuario']) &&
    isset($_POST['password']) && !empty($_POST['password']) &&
    isset($_POST['password2']) && !empty($_POST['password2'])

    {
        $conn=mysqli_connect ($host, $user, $pw)or die ("Problemas al conectar");
        mysqli_select_db($db, $conn) or die ("Problemas al conectar");

        mysqli_query("INSERT INTRO login" (txtNusuario, txtpassword, txtpassword2) VALUES ('$_POST[txtNusuario] ',' $_POST[txtpassword] ',' $_POST[txtpassword2]')", $conn);
        echo "datos insertados";
    }else{
        echo "problema al insertar datos"
    }






$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "test";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
if (!$conn) 
{
	die("No hay conexión: ".mysqli_connect_error());
}

$nombre = $_POST["txtusuario"];
$pass = $_POST["txtpassword"];

$query = mysqli_query($conn,"SELECT * FROM login WHERE usuario = '".$nombre."' and password = '".$pass."'");
$nr = mysqli_num_rows($query);

if($nr == 1)
{
	header ("Location: http://localhost/Login-basico-con-HTML-PHP-y-MySQL-master/registro.html");
}

?>