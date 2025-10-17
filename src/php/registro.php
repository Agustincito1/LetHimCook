<?php
    header("Content-Type: application/json");
    include "conexion.php"; // trae $pdo

    $data = json_decode(file_get_contents("php://input"), true);

    $name     = $data["name"] ?? "";
    $password = $data["password"] ?? "";
    $rPass    = $data["rPass"] ?? "";
    $gmail    = $data["gmail"] ?? "";


    if ($password !== $rPass) {
        echo json_encode([
            "success" => false,
            "message" => "Las contraseñas no coinciden"
        ]);
        exit;
    }

    // Verificar si el nombre de usuario ya existe
    $stmt = $pdo->prepare("SELECT 
        COUNT(*) 
    FROM
        usuario 
    WHERE gmail = ?");
    
    $stmt->execute([$gmail]);
    $existe = $stmt->fetchColumn();

    if ($existe) {
        echo json_encode([
            "success" => false,
            "message" => "El gmail de usuario ya está en uso"
        ]);
        exit;
    }

    // Insertar nuevo usuario
    try {
        $stmt = $pdo->prepare("INSERT INTO 
            usuario (nombreUsuario, contraseña, gmail, id_tipoUsuario) 
        VALUES (?, ?, ?, 1)");
        
        $stmt->execute([$name, $password, $gmail]);

        echo json_encode([
            "success" => true,
            "message" => "Usuario registrado correctamente",
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "message" => "Error en la base de datos: " . $e->getMessage()
        ]);
    }
?>