<?php
    header("Content-Type: application/json");
    session_start();

    if(isset($_SESSION["user_id"])){
        echo json_encode([
            "success" => true,
            "message" => "Sesion encontrada",
            "dataUser" => $_SESSION["user_id"]
        ]);

    }
    else{
        echo json_encode([
            "success" => false,
            "message" => "No hay una sesion"
        ]);
    }


?>
