<?php
    session_start();
    header("Content-Type: application/json");
    include "conexion.php";

    $data = json_decode(file_get_contents("php://input"), true);
    $gmail    = $data["gmail"] ?? "";
    $newPassword = $data["password"] ?? "";

    if (empty($gmail) || empty($newPassword)) {
        echo json_encode([
            "success" => false,
            "message" => "Faltan datos requeridos."
        ]);
        exit;
    }

    try {
       
        $stmt = $pdo->prepare("UPDATE usuario SET contraseña = ? WHERE gmail = ?");
        $stmt->execute([$newPassword, $gmail]);
        if ($stmt->rowCount() > 0) {
            echo json_encode([
                "success" => true,
                "message" => "Contraseña actualizada correctamente."
            ]);
            exit;
        } else {
            echo json_encode([
                "success" => false,
                "message" => "No se encontró el Gmail o no se modificó la contraseña."
            ]);
            exit;
        }

    } catch (\Throwable $th) {
        echo json_encode([
            "success" => false,
            "message" => "Contraseña no actualizada"
        ]);
        
    }

?>
