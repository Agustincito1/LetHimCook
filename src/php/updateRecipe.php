<?php
    include 'conexion.php'; // Asegúrate de tener la conexión PDO en $pdo

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        exit;
    }   

    
    $name = $_POST["name"] ?? '';
    $descripcion = $_POST["descripcion"] ?? '';
    $ingredientes = json_decode($_POST["ingredientes"] ?? '[]', true);
    $pasos = json_decode($_POST["pasos"] ?? '[]', true);
    $imgPrin = $_FILES["imgPrin"] ?? null;
    $id = $_POST["id"];

    $ifExistImgP = $_POST["imgPrincipalE"] ?? null;

    if ( !$name || !$descripcion) {
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
            if (isset($_POST[$fileKey])){
                $imgUrl = $_POST[$fileKey];
                $imagenesPasosPaths[] = $imgUrl;
            }
        }
    }
    
    $ingredientesJson = [];
    foreach($ingredientes as $ingrediente){
        $ingredientesJson[] = $ingrediente;
    }
    $pasoAndDescriptionJson = json_encode($pasoAndDescription);
    $ingredientesJson = json_encode($ingredientesJson);
    $imagenesJson = json_encode([
        'principal' => $imgPath,
        'pasos' => $imagenesPasosPaths
    ]);



    try {
        $stmt = $pdo->prepare("UPDATE 
        `receta` 
        SET 
        `titulo`=?,
        `pasos`=?,
        `descripcion`=?,
        `imagenes`=?,
        `ingredientes`=? 
        WHERE id_receta = ?");
        $stmt->execute([$name, $pasoAndDescriptionJson, $descripcion, $imagenesJson, $ingredientesJson, $id]);
        echo json_encode(['success' => true, 'message' => 'Receta actualizada correctamente']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al actualizada la receta: ' . $e->getMessage()]);
    }

?>