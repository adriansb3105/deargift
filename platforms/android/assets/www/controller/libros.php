<?php 
	require_once("../Models/libros.php");
	$boton= $_POST['boton'];
	if($boton==='buscar')
	{
		$valor=$_POST['valor'];
		$inst = new libros();
		$r=$inst ->lista_libros($valor);
		//print_r($r);
		echo json_encode($r);
	}
	
?>