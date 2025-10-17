<?php
    session_start();
    header("Content-Type: application/json");
    include "conexion.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $gmail    = $data["gmail"] ?? "";
    $password = $data["password"] ?? "";


    $stmt = $pdo->prepare("SELECT 
        id_usuario, 
        contraseña 
    FROM 
        usuario 
    WHERE 
        gmail = ?");
    
    $stmt->execute([$gmail]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        echo json_encode([
            "success" => false,
            "message" => "Usuario no encontrado"
        ]);
        exit;
    }

    // Validar contraseña
    if ($usuario["contraseña"] === $password) {
        $_SESSION["user_id"] = $usuario["id_usuario"];
        echo json_encode([
            "success" => true,
            "message" => "Login exitoso"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Contraseña incorrecta"
        ]);
    }

?>
