<?php
    header("Content-Type: application/json");
    session_start();
    include "conexion.php";
    $user = $_SESSION["user_id"];

    try{
        
        $query = $pdo->prepare("SELECT titulo, id_receta, imagenes, descripcion, nombreUsuario FROM receta, usuario WHERE ? = receta.id_usuario and usuario.id_usuario = receta.id_usuario");
        $query->execute([$user]);
        $table = $query->fetchAll(PDO::FETCH_ASSOC);

        if($table && count($table) > 0){
            echo json_encode([
                "success" => true,
                "data" => $table
            ]);
        }
        else{
            echo json_encode([
                "success" => false,
                "error" => "No hay recetas todavia"
            ]);
        }
    }
    catch(PDOException $err){
        echo json_encode([
            "success" => false,
            "error" => $err->getMessage()
        ]);
    }
?>