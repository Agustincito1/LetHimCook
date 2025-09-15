<?php
    $host = "localhost";
    $db = "lethimcook";
    $user = "root";
    $pass = "1234";

    try{
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOExepcion $e){
        echo "Error de conexion: ". $e->getMessage();
    }

?>