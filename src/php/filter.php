<?php
    header("Content-Type: application/json");
    include 'conexion.php';

    // filter.php
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        exit;
    }
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['query'])) {
        $name = $data['query'];
    } else {
        echo json_encode(['success' => false, 'message' => 'Falta el parámetro de búsqueda']);
        exit;
    }

    try{
        $query = $pdo->prepare("    SELECT titulo, id_receta, nombreUsuario, imagenes, descripcion 
            FROM receta 
            INNER JOIN usuario ON receta.id_usuario = usuario.id_usuario
            WHERE titulo LIKE CONCAT('%', ?, '%')
        ");
        $query->execute([$name]);
        $table = $query->fetchAll(PDO::FETCH_ASSOC);

        if($table && count($table) > 0){
            echo json_encode([
                "success" => true,
                "data" => $table
            ]);
        }
        else{
            echo json_encode([
                "success" => false,
                "error" => "No hay recetas con ese nombre"
            ]);
        }
    }
    catch(PDOException $err){
        echo json_encode([
            "success" => false,
            "error" => $err->getMessage()
        ]);
    }
?>