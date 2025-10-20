<?php
    header("Content-Type: application/json");
    include 'conexion.php';
    session_start();
    $user = $_SESSION["user_id"];
    // filter.php
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['id'])) {
        $id = $data['id'];
    } else {
        echo json_encode(['success' => false, 'message' => 'Falta el parámetros']);
        exit;
    }

    try{
        $query = $pdo->prepare("DELETE FROM cantidad_ingredientes WHERE id_receta = ?;
            DELETE FROM receta WHERE id_receta = ? AND id_usuario = ?");
            
            
        $query->execute([$id, $id, $user]);

        if($query){
            echo json_encode([
                "success" => true,
            ]);
        }
        else{
            echo json_encode([
                "success" => false,
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