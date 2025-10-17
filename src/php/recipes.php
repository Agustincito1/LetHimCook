<?php
    header("Content-Type: application/json");
    include "conexion.php";
    session_start();

    $id = $_SESSION["user_id"];
    try{
        $query = $pdo->prepare("SELECT 
                titulo, 
                id_receta, 
                imagenes, 
                descripcion, 
                nombreUsuario, 
                usuario.id_usuario, 
                EXISTS (
                    SELECT 1 
                    FROM recetaguardada 
                    WHERE recetaguardada.id_usuario = ? 
                AND recetaguardada.id_receta = receta.id_receta) AS recetaxusuario
            FROM 
                receta, 
                usuario 
            WHERE 
                usuario.id_usuario = receta.id_usuario;");

        $query->execute([$id]);
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