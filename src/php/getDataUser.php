<?php
    header("Content-Type: application/json");
    session_start();
    include "conexion.php";
    $user = $_SESSION["user_id"];

    try {
        $query = $pdo->prepare("SELECT 
            nombreUsuario, 
            contraseña, 
            gmail, 
            id_usuario 
        FROM 
            usuario 
        WHERE 
            id_usuario = ?");

        $query->execute([$user]);
        $usuario = $query->fetchAll(PDO::FETCH_ASSOC);

        if($usuario && count($usuario) > 0){
            echo json_encode([
                "success" => true,
                "data" => $usuario
            ]);
        }
        else{
            echo json_encode([
                "success" => false,
                "error" => "No hay usuario"
            ]);
        }


    }   
    catch(PDOException $err){
        echo json_encode([
            "success" => false,
            "error" => $e->getMessage()
        ]);
    }
  
?>