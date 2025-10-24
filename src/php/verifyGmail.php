<?php
    session_start();
    header("Content-Type: application/json");
    include "conexion.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $gmail    = $data["gmail"] ?? "";

    $stmt = $pdo->prepare("SELECT 
        id_usuario
    FROM 
        usuario 
    WHERE 
        gmail = ?");
    
    $stmt->execute([$gmail]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        echo json_encode([
            "success" => false,
            "message" => "El gmail no existe en nuestra pagina"
        ]);
        exit;
    }
       
    
    

?>
