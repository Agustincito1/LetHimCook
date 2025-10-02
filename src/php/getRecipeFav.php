<?php
    header("Content-Type: application/json");
    session_start();
    include "conexion.php";
    $user = $_SESSION["user_id"];

    try{
        $query = $pdo->prepare("SELECT titulo, receta.id_receta, imagenes, descripcion FROM recetaguardada, receta WHERE ? = recetaguardada.id_usuario AND recetaguardada.id_receta = receta.id_receta");
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