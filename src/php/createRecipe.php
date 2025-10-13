<?php
    include 'conexion.php'; // Asegúrate de tener la conexión PDO en $pdo

    session_start();

    $id_usuario = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        exit;
    }   

    
    $name = $_POST["name"] ?? '';
    $descripcion = $_POST["descripcion"] ?? '';
    $ingredientes = json_decode($_POST["ingredientes"] ?? '[]', true);
    $pasos = json_decode($_POST["pasos"] ?? '[]', true);
    $imgPrin = $_FILES["imgPrin"] ?? null;


    if (!$id_usuario || !$name || !$descripcion) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos obligatorios']);
        exit;
    }

    $imgPath = '';
    if ($imgPrin && $imgPrin['error'] === UPLOAD_ERR_OK) {
        $ext = pathinfo($imgPrin['name'], PATHINFO_EXTENSION);
        $nombreArchivo = uniqid('receta_') . '.' . $ext;
        $imgPath = '../uploads/' . $nombreArchivo; 
        $destino = __DIR__ . '/../uploads/' . $nombreArchivo;
        move_uploaded_file($imgPrin['tmp_name'], $destino);
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
        $stmt = $pdo->prepare("INSERT INTO receta (id_usuario, titulo, pasos, descripcion, imagenes, ingredientes) VALUES (?, ?, ?, ?, ?,?)");
        $stmt->execute([$id_usuario, $name, $pasoAndDescriptionJson, $descripcion, $imagenesJson, $ingredientesJson]);
        echo json_encode(['success' => true, 'message' => 'Receta creada correctamente']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al guardar la receta: ' . $e->getMessage()]);
    }

?>