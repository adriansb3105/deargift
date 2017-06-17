<?php
class ConexionDB{
  private $conn;

  public function __construct(){
    $this -> conn = mysqli_connect('us-cdbr-iron-east-03.cleardb.net', 'b9374b69eb27a1', 'd44752f5', 'heroku_1dc4dabb03f9b5c');
    if(!$this -> conn){
      echo 'Problemas de conexion al servidor';
      exit();
    }
  }

  public function conectar(){
    return $this -> conn;
  }
}



//mysql://b9374b69eb27a1:d44752f5@us-cdbr-iron-east-03.cleardb.net/heroku_1dc4dabb03f9b5c?reconnect=true