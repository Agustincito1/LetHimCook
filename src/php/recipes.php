<?php
    header("Content-Type: application/json");
    include "conexion.php";

    try{
        $query = $pdo->prepare("SELECT titulo, id_receta, imagenes, descripcion, nombreUsuario FROM receta, usuario WHERE usuario.id_usuario = receta.id_usuario");
        $query->execute();
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
            "error" => $e->getMessage()
        ]);
    }
?>