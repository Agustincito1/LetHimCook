<?php
    header("Content-Type: application/json");
    include "conexion.php";
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'error' => 'Método no permitido']);
        exit;
    }

    session_start();


    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['idRecipe'])) {
        $idRecipe = $data['idRecipe'];
    }
    if(isset($_SESSION["user_id"])){
        $idUser = $_SESSION["user_id"];
    }

    try{
        $query = $pdo->prepare("
            SELECT 1 
            FROM receta
            WHERE id_receta = ? 
            AND id_usuario = ?
            LIMIT 1
        ");

        $query->execute([$idRecipe, $idUser]);
        $exists = $query->fetchColumn() ? true : false;

        echo json_encode($exists);
    }
    catch(PDOException $err){
        echo json_encode([
            "success" => false,
            "error" => $err->getMessage()
        ]);
    }
?>