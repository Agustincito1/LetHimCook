<?php

    include "conexion.php";

    // Traer todos los ingredientes
    $stmt = $pdo->prepare("SELECT 
        ingredientes.id_ingrediente,
        ingredientes.nombre, 
        tipo_unidad.unidad 
    FROM 
        ingredientes, 
        tipo_unidad 
    WHERE
        ingredientes.id_tipoUnidad = tipo_unidad.id_tipoUnidad
    ORDER BY nombre ASC");
    $stmt->execute();
    $ingredientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver JSON
    echo json_encode($ingredientes);
?>
