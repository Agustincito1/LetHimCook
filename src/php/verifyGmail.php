<?php
    session_start();
    header("Content-Type: application/json");
    include "conexion.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $gmail  = $data["gmail"] ?? "";

    $stmt = $pdo->prepare("SELECT 
        nombreUsuario
    FROM 
        usuario 
    WHERE 
        gmail = ?");
    
    $stmt->execute([$gmail]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        echo json_encode([
            "success" => false,
            "message" => "El gmail no existe en nuestra pagina"
        ]);
        exit;
    }
       
    
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require __DIR__ . '/../../vendor/autoload.php';
    use Dotenv\Dotenv;

    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../'); 
    $dotenv->load();

    $toEmail = $gmail;
    $toName  = $usuario["nombreUsuario"];

    $code = random_int(100000, 999999);


    $codeHash = password_hash($code, PASSWORD_DEFAULT);
    $_SESSION['verification'] = [
        'email' => $toEmail,
        'code_hash' => $codeHash,
        'created_at' => time()
    ];


    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['SMTP_USER'];
        $mail->Password   = $_ENV['SMTP_PASS'];
        $mail->SMTPSecure = $_ENV['SMTP_SECURE'];
        $mail->Port       = $_ENV['SMTP_PORT'];

        $mail->setFrom($_ENV['SMTP_USER'], 'LetHimCook');
        $mail->addAddress($toEmail, $toName);
        $mail->isHTML(true);
        $mail->Subject = 'Código de verificación';
        $mail->Body    = "
            <p>Hola <strong>{$toName}</strong>,</p>
            <p>Tu código de verificación es:</p>
            <h2 style='letter-spacing:4px'>{$code}</h2>
            <p>Este código expira en 10 minutos.</p>
            <hr>
            <small>Si no solicitaste esto, ignorá este correo.</small>
        ";
        $mail->AltBody = "Hola {$toName}, tu código es: {$code} (expira en 10 minutos)";

        $mail->send();

        echo json_encode([
            "success" => true,
            "message" => "Espera unos segudos",
            "data" => $toEmail,
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
?>  
