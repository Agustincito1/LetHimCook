<?php
    header("Content-Type: application/json");
    include "conexion.php";
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'error' => 'Método no permitido']);
        exit;
    }

    session_start();


    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['idRecipe'])) {
        $idRecipe = $data['idRecipe'];
    }
    if(isset($_SESSION["user_id"])){
        $idUser = $_SESSION["user_id"];
    }

    try{
        $query = $pdo->prepare("SELECT 1 FROM opinion WHERE id_usuario = ? AND id_receta = ? LIMIT 1");
        $query->execute([$idUser, $idRecipe]);
        $exist = $query->fetchColumn() ? true : false;


        if($exist){
            if(isset($data["rating"])){
                
                $rating = $data["rating"];
                $updateQuery = $pdo->prepare("UPDATE opinion SET puntaje = ? WHERE id_usuario = ? AND id_receta = ?");
                $updateQuery->execute([$rating, $idUser, $idRecipe]);
                echo json_encode(true);
                exit;
            }

            elseif(isset($data["mensaje"])){
                $mensaje = $data["mensaje"];
                $updateQuery = $pdo->prepare("UPDATE opinion SET mensaje = ? WHERE id_usuario = ? AND id_receta = ?");
                $updateQuery->execute([$mensaje, $idUser, $idRecipe]);
                echo json_encode(true);
                exit;
            }
            else{
                echo json_encode(false);
                exit;
            }
                
            
        }
        else{
            
            if(isset($data["rating"])){
                $rating = $data["rating"];
                $insertQuery = $pdo->prepare("INSERT INTO opinion (id_receta, id_usuario, puntaje) VALUES (?, ?, ?)");
                $insertQuery->execute([$idRecipe, $idUser, $rating]);
                echo json_encode(true);
                exit;
            }

            elseif(isset($data["mensaje"])){
                $mensaje = $data["mensaje"];
                $insertQuery = $pdo->prepare("INSERT INTO opinion (id_receta, id_usuario, mensaje) VALUES (?, ?, ?)");
                $insertQuery->execute([$idRecipe, $idUser, $mensaje]);
                echo json_encode(true);
                exit;
            }
            else{
                echo json_encode(false);
                exit;
            }
           
        }

    }
    catch(PDOException $err){
        echo json_encode([
            "success" => false,
            "error" => $err->getMessage()
        ]);
    }
?>