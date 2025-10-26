<?php
    header("Content-Type: application/json");
    include "conexion.php";
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'error' => 'Método no permitido']);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['id'])) {
        $id = $data['id'];
    }

    try{
        $query = $pdo->prepare("SELECT 
            receta.id_receta,
            receta.titulo, 
            receta.imagenes, 
            receta.descripcion, 
            usuario.nombreUsuario,
            receta.pasos
        FROM 
            receta, 
            usuario 
        WHERE 
            ? = id_receta 
        AND 
            usuario.id_usuario = receta.id_usuario;");

        $query->execute([$id]);


        $recipe = $query->fetchAll(PDO::FETCH_ASSOC);

        $idR = $recipe[0]["id_receta"];


        $query = $pdo->prepare("SELECT 
            ingredientes.id_ingrediente,
            ingredientes.nombre,
            cantidad_ingredientes.cantidad,
            tipo_unidad.unidad
        FROM 
            ingredientes, 
            cantidad_ingredientes,
            tipo_unidad
        WHERE 
            cantidad_ingredientes.id_receta = ?
        AND
            ingredientes.id_ingrediente = cantidad_ingredientes.id_ingrediente
        AND 
            tipo_unidad.id_tipoUnidad = ingredientes.id_tipoUnidad");

        $query->execute([$idR]);

        $ingredientes = $query->fetchAll(PDO::FETCH_ASSOC);

        $result = [
            "ingrediente"=>$ingredientes, 
            "receta"=>$recipe
        ];

        if($ingredientes && count($ingredientes) > 0){
            echo json_encode([
                "success" => true,
                "data" => $result
            ]);
        }
        else{
            echo json_encode([
                "success" => false,
                "error" => "No se encontro la receta"
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