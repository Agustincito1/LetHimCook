<?php
    include 'conexion.php'; // Asegúrate de tener la conexión PDO en $pdo
    session_start();
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        exit;
    }   


    $name = $_POST["name"] ?? '';
    $descripcion = $_POST["descripcion"] ?? '';
    $ingredientes = json_decode($_POST["ingredientesID"] ?? '[]', true);
    $ingredientesC = json_decode($_POST["ingredientesCantidad"] ?? '[]', true);
    $pasos = json_decode($_POST["pasos"] ?? '[]', true);
    $imgPrin = $_FILES["imgPrin"] ?? null;
    $id = $_POST["id"];

    $ifExistImgP = $_POST["imgPrincipalE"] ?? null;
    $id_usuario = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

    if (!$id_usuario || !$name || !$descripcion) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos obligatorios']);
        exit;
    }

    
    if($ifExistImgP){
        $imgPath = $ifExistImgP;

    }
    else{
        $imgPath = '';
        if ($imgPrin && $imgPrin['error'] === UPLOAD_ERR_OK) {
            $ext = pathinfo($imgPrin['name'], PATHINFO_EXTENSION);
            $nombreArchivo = uniqid('receta_') . '.' . $ext;
            $imgPath = '../uploads/' . $nombreArchivo; 
            $destino = __DIR__ . '/../uploads/' . $nombreArchivo;
            move_uploaded_file($imgPrin['tmp_name'], $destino);
        }
    }
   
    $imagenesPasosPaths = [];
    $pasoAndDescription = [];
    foreach ($pasos as $index => $paso) {
        $step = $paso["step"];
        $description = $paso["descripcion"];

        $pasoAndDescription[] = [
            'paso' => $step,
            'description' => $description
        ];

           

        $fileKey = "imagen_paso_$index";
        if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
            $ext = pathinfo($_FILES[$fileKey]['name'], PATHINFO_EXTENSION);
            $nombrePaso = uniqid('paso_') . '.' . $ext;
            $imgPasoPath = '../uploads/' . $nombrePaso;
            $destinoPaso = __DIR__ . '/../uploads/' . $nombrePaso;
            move_uploaded_file($_FILES[$fileKey]['tmp_name'], $destinoPaso);
            $imagenesPasosPaths[] = $imgPasoPath;
        }
        else{
            if (isset($_POST[$fileKey])) {
                $imgPasoPath = $_POST[$fileKey];

                $imagenesPasosPaths[] = $imgPasoPath;
            }
        }
    }


    $pasoAndDescriptionJson = json_encode($pasoAndDescription);
    $imagenesJson = json_encode([
        'principal' => $imgPath,
        'pasos' => $imagenesPasosPaths
    ]);

    try {
        $stmt = $pdo->prepare("UPDATE 
            receta 
        SET 
            titulo = ?, 
            pasos = ?, 
            descripcion = ?, 
            imagenes = ? 
        WHERE 
            id_receta = ? 
        AND id_usuario = ?");
        $stmt->execute([$name, $pasoAndDescriptionJson, $descripcion, $imagenesJson, $id, $id_usuario]);
        $stmtDelete = $pdo->prepare("DELETE FROM cantidad_ingredientes WHERE id_receta = ?");
        $stmtDelete->execute([$id]);

        $stmtIng = $pdo->prepare("INSERT INTO 
            cantidad_ingredientes (id_receta, id_ingrediente, cantidad) 
            VALUES (?, ?, ?)"
        );

        foreach ($ingredientes as $index => $ingrediente) {
            $cantidad = $ingredientesC[$index] ?? null;
            if ($cantidad !== null) {
                $stmtIng->execute([$id, $ingrediente, $cantidad]);
            }
        }


        echo json_encode(['success' => true, 'message' => 'Receta actualizada correctamente']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al actualizada la receta: ' . $e->getMessage()]);
    }

?>