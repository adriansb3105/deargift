<?php
require_once 'connection.php';

if (isset($_POST['action'])) {
	switch ($_POST['action']) {
		case 'login': echo login($_POST['email'], $_POST['password']); break;
	}
}

function login($email, $password){
	
	$conexion = new ConexionDB();
	$conn = $conexion->conectar();

	$query = mysqli_query($conn, "select * from users where email='".$email."' AND password='".$password."'");
	$data = mysqli_fetch_all($query);

	mysqli_close($conn);

	return json_encode($data);
}