<?php
    //log out.php
    session_start();
    $_SESSION = [];
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Sesión cerrada']);
?>