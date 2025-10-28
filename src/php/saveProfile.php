<?php
    header("Content-Type: application/json");
    include "conexion.php";
    session_start();
    $data   = json_decode(file_get_contents("php://input"), true);
    $idUser = $_SESSION["user_id"];
    $name   = $data["name"] ?? "";


    try {
        $stmt = $pdo->prepare("UPDATE `usuario` SET `nombreUsuario` = ? WHERE id_usuario = ?");
        
        $stmt->execute([$name, $idUser]);

        echo json_encode([
            "success" => true
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "message" => "Error en la base de datos: " . $e->getMessage()
        ]);
    }
?>