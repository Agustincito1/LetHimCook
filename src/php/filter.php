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
        try{
            $query = $pdo->prepare("SELECT 
                    titulo, 
                    id_receta, 
                    nombreUsuario, 
                    imagenes, 
                    descripcion 
                FROM 
                    receta 
                INNER JOIN 
                    usuario 
                ON receta.id_usuario = usuario.id_usuario
                WHERE 
                    titulo LIKE CONCAT('%', ?, '%')
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

    } else {
        if(isset($data['ingredientes'])){
            $ingredientes = $data['ingredientes'];
            try{
                $condiciones = [];
                foreach($ingredientes as $ingrediente){
                    $condiciones[] = "ingredientes.nombre LIKE ?";
                }

                $query = $pdo->prepare("SELECT 
                        receta.titulo, 
                        receta.id_receta, 
                        usuario.nombreUsuario, 
                        receta.imagenes, 
                        receta.descripcion
                    FROM 
                        cantidad_ingredientes 
                    INNER JOIN 
                        receta ON receta.id_receta = cantidad_ingredientes.id_receta
                    INNER JOIN 
                        usuario ON receta.id_usuario = usuario.id_usuario
                    INNER JOIN 
                        ingredientes ON ingredientes.id_ingrediente = cantidad_ingredientes.id_ingrediente AND ".implode(" OR ", $condiciones));
                
                $query->execute(array_map(fn($i) => "%$i%", $ingredientes));
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
                        "error" => "No hay recetas con esos ingredientes"
                    ]);
                }
            }
            catch(PDOException $err){
                echo json_encode([
                    "success" => false,
                    "error" => $err->getMessage()
                ]);
            }
        }
        else{
            echo json_encode(['success' => false, 'message' => 'Falta el parámetro de búsqueda']);
            exit;
        }
    }

    
?>