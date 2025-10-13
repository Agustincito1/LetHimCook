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
        $query = $pdo->prepare("SELECT titulo, imagenes, descripcion, nombreUsuario, pasos, ingredientes FROM receta, usuario WHERE ? = id_receta AND usuario.id_usuario = receta.id_usuario");
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