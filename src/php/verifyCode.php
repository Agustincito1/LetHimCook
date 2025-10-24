<?php
    session_start();
    header("Content-Type: application/json");
    include "conexion.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $code = $data["code"] ?? "";
    $gmail = $data["gmail"] ?? "";
    
    if (!isset($_SESSION['verification'])) {
        echo json_encode([
            "success" => false,
            "message" => "Codigo no encontrado",
        ]);
        exit;
    }

    $stored = $_SESSION['verification'];

    if (time() - $stored['created_at'] > 600) {
        unset($_SESSION['verification']);
        echo json_encode([
            "success" => false,
            "message" => "El código ha expirado. Solicita uno nuevo.",
        ]);
        exit;
    }
    
    
    if (password_verify($code, $stored['code_hash'])) {
        if ($stored['email'] === $gmail) {
            echo json_encode([
                "success" => true,
                "message" => "Codigo verificado",
            ]);
            unset($_SESSION['verification']);
            exit;
        }
        else{
            echo json_encode([
                "success" => false,
                "message" => "Email no es correcto",
            ]);
            exit;
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Codigo incorrecto",
        ]);
        exit;
    }

        
   
?>  
