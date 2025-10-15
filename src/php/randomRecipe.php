<?php
    header("Content-Type: application/json");
    session_start();
    include "conexion.php";

    try {
        $query = $pdo->prepare("SELECT id_receta FROM receta ORDER BY RAND() LIMIT 1");
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        if($result > 0){
            echo json_encode([
                "success" => true,
                "data" => $result
            ]);
        }
        else{
            echo json_encode([
                "success" => false,
                "error" => "No hay recetas"
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