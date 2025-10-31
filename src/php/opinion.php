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

    
    if(isset($data["tipo"])){
       
        $query = $pdo->prepare("SELECT mensaje, puntaje, nombreUsuario FROM opinion, usuario WHERE opinion.id_usuario = ? AND id_receta = ?  limit 1");
        $query->execute([$idUser, $idRecipe]);
        $registro = $query->fetch(PDO::FETCH_ASSOC);

        $query = $pdo->prepare("SELECT mensaje, puntaje, nombreUsuario FROM opinion, usuario WHERE id_receta = ? AND opinion.id_usuario != ?");
        $query->execute([$idRecipe, $idUser]);
        $allregistro = $query->fetch(PDO::FETCH_ASSOC);

        $mensajes = [];
        if($registro["mensaje"] != ""){
            $mensajes = json_decode($registro["mensaje"], true);
        }
        if($registro["puntaje"] != ""){
            $mensajes = json_decode($registro["mensaje"], true);
        }

        echo json_encode([
            "success" => true,
            "AllOpinion" => $allregistro,
            "myOpinion" => $registro
        ]);

        exit;

    }
    else{
        try{
        
            $query = $pdo->prepare("SELECT mensaje, puntaje FROM opinion WHERE id_usuario = ? AND id_receta = ? limit 1");
            $query->execute([$idUser, $idRecipe]);
            $registro = $query->fetch(PDO::FETCH_ASSOC);
            
            
            if($registro){

                if(isset($data["rating"])){
                    
                    $rating = $data["rating"];
                    $updateQuery = $pdo->prepare("UPDATE opinion SET puntaje = ? WHERE id_usuario = ? AND id_receta = ?");
                    $updateQuery->execute([$rating, $idUser, $idRecipe]);
                    echo json_encode(true);
                    exit;
                }

                elseif(isset($data["mensaje"])){
                    $newMensaje = "";
                    $mensajesBD = [];

                    $mensaje = $data["mensaje"];

                    if($registro["mensaje"] != ""){
                        $mensajesBD = json_decode($registro["mensaje"], true);
                        $mensajesBD[] = $mensaje;
                    }
                    else{
                        $mensajesBD[] = $mensaje;
                    }
                    
                    $nuevoJson = json_encode($mensajesBD, JSON_UNESCAPED_UNICODE);

                    $updateQuery = $pdo->prepare("UPDATE opinion SET mensaje = ? WHERE id_usuario = ? AND id_receta = ?");
                    $updateQuery->execute([$nuevoJson, $idUser, $idRecipe]);
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
    }

   
?>