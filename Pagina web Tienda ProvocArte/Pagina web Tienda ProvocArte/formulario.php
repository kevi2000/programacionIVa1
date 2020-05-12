<!DOCTYPE html>
<html> 
	<head> 
		<meta name="author" content="Edwin Joya">
	<head>

	<body>

		<?php
			
			$con = mysqli_connect("sql309.260mb.net", "n260m_18766155", "u1w7guba", "n260m_18766155_datos");
			if (mysqli_connect_errno())
			{
				echo "No se pudo conectar a la base de datos" . mysqli_connect_error();
			}
			
			$nom = mysqli_real_escape_string($con, $_POST["no"]);
            $ape = mysqli_real_escape_string($con, $_POST["ape"]);
            $cor = mysqli_real_escape_string($con, $_POST["correo"]);
            $user = mysqli_real_escape_string($con, $_POST["user"]);
	        $pass = mysqli_real_escape_string($con, $_POST["pass"]);
	        $gen = mysqli_real_escape_string($con, $_POST["gen"]);
	        
			
			$sql = "INSERT INTO registro (nombre, apellido, mail, user, pass, gen)
			VALUES ('$nom', '$ape','$cor','$user','$pass','$gen')";

			if (!mysqli_query($con,$sql)) {
			 		die('Error: ' . mysqli_error($con));
				} else
				{

						header("location:login.php");    
        }
		?>

	</body>
</html>