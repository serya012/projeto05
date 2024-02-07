<?php
require_once 'headers.php';
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Lógica para obter feedbacks
    if (isset($_GET['id'])) {
        // Obter feedback por ID
        $id = $con->real_escape_string($_GET['id']);
        $sql = $con->query("SELECT * FROM feedbacks WHERE id = '$id'");
        $data = $sql->fetch_assoc();
    } else {
        // Obter todos os feedbacks
        $data = array();
        $sql = $con->query("SELECT * FROM feedbacks");
        while ($d = $sql->fetch_assoc()) {
            $data[] = $d;
        }
    }
    exit(json_encode($data));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lógica para adicionar um novo feedback
    $data = json_decode(file_get_contents("php://input"));
    $avaliacao = $con->real_escape_string($data->avaliacao);
    $comentario = $con->real_escape_string($data->comentario);
    $sql = $con->query("INSERT INTO feedbacks (avaliacao, comentario) VALUES ('$avaliacao', '$comentario')");
    if ($sql) {
        $data->id = $con->insert_id;
        exit(json_encode($data));
    } else {
        exit(json_encode(array('status' => 'Deu ruim')));
    }
}
?>
