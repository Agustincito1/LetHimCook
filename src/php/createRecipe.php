<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    header('Content-Type: application/json');
    require_once 'conexion.php'; // Asegúrate de tener la conexión PDO en $pdo

    session_start();

    $id_usuario = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        exit;
    }

    $titulo = $_POST['name'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $pasos = $_POST['step'] ?? [];
    $ingredientes = $_POST['ingrediente'] ?? [];
    // Manejo de imágenes
    $imagenPrincipal = $_FILES['imagenPrincipal'] ?? null;
    $imagenesPaso = $_FILES['imagenPaso'] ?? null;

    
    // Validar datos mínimos
    if (!$id_usuario || !$titulo || !$descripcion || !$imagenPrincipal) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos obligatorios']);
        exit;
    }

    // Guardar imagen principal
    $imgPath = '';
    if ($imagenPrincipal && $imagenPrincipal['error'] === UPLOAD_ERR_OK) {
        $ext = pathinfo($imagenPrincipal['name'], PATHINFO_EXTENSION);
        $nombreArchivo = uniqid('receta_') . '.' . $ext;
        $imgPath = '../uploads/' . $nombreArchivo; // Ruta para la base de datos/acceso web
        $destino = __DIR__ . '/../uploads/' . $nombreArchivo; // Ruta física
        move_uploaded_file($imagenPrincipal['tmp_name'], $destino);
    }

    // Guardar imágenes de pasos (opcional, ejemplo simple)
    $imagenesPasosPaths = [];
    if ($imagenesPaso && isset($imagenesPaso['name']) && is_array($imagenesPaso['name'])) {
        foreach ($imagenesPaso['tmp_name'] as $i => $tmpName) {
            if ($imagenesPaso['error'][$i] === UPLOAD_ERR_OK) {
                $ext = pathinfo($imagenesPaso['name'][$i], PATHINFO_EXTENSION);
                $nombrePaso = uniqid('paso_') . '.' . $ext;
                $imgPasoPath = '../uploads/' . $nombrePaso; // Ruta para la base de datos/acceso web
                $destinoPaso = __DIR__ . '/../uploads/' . $nombrePaso; // Ruta física
                move_uploaded_file($tmpName, $destinoPaso);
                $imagenesPasosPaths[] = $imgPasoPath;
            } else {
                $imagenesPasosPaths[] = null;
            }
        }
    }

    // Serializar pasos e imágenes para guardar en la base de datos
    $pasosJson = json_encode($pasos);
    $imagenesJson = json_encode([
        'principal' => $imgPath,
        'pasos' => $imagenesPasosPaths
    ]);

    try {
        $stmt = $pdo->prepare("INSERT INTO receta (id_usuario, titulo, pasos, descripcion, imagenes) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$id_usuario, $titulo, $pasosJson, $descripcion, $imagenesJson]);
        echo json_encode(['success' => true, 'message' => 'Receta creada correctamente']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al guardar la receta: ' . $e->getMessage()]);
    }

?>