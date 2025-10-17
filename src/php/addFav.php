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
        $query = $pdo->prepare("INSERT INTO 
            `recetaguardada` (`id_usuario`, `id_receta`) 
            VALUES (?,?)");
            
        $query->execute([$user, $id]);

        if($query){
            echo json_encode([
                "success" => true,
            ]);
        }
        else{
            echo json_encode([
                "success" => false,
                "error" => "No hay recetas con ese nombre"
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