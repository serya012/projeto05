<?php
require_once 'headers.php';
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $con->real_escape_string($_GET['id']);
        $sql = $con->query("SELECT * FROM eventos WHERE id = '$id'");
        $data = $sql->fetch_assoc();
    } else {
        $data = array();
        $sql = $con->query("SELECT * FROM eventos");
        while ($d = $sql->fetch_assoc()) {
            $data[] = $d;
        }
    }
    exit(json_encode($data));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $nome = $con->real_escape_string($data->nome);
    $data_evento = $con->real_escape_string($data->data);
    $horario_entrada = $con->real_escape_string($data->horario_entrada);
    $horario_saida = $con->real_escape_string($data->horario_saida);
    $local = $con->real_escape_string($data->local);

    $sql = "INSERT INTO eventos (nome, data, horario_entrada, horario_saida, local) 
            VALUES ('$nome', '$data_evento', '$horario_entrada', '$horario_saida', '$local')";

    if ($con->query($sql) === TRUE) {
        $data->id = $con->insert_id;
        exit(json_encode($data));
    } else {
        exit(json_encode(array('status' => 'Deu ruim')));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (isset($_GET['id'])) {
        $id = $con->real_escape_string($_GET['id']);
        $data = json_decode(file_get_contents("php://input"));

        $nome = $con->real_escape_string($data->nome);
        $data_evento = $con->real_escape_string($data->data);
        $horario_entrada = $con->real_escape_string($data->horario_entrada);
        $horario_saida = $con->real_escape_string($data->horario_saida);
        $local = $con->real_escape_string($data->local);

        $sql = "UPDATE eventos SET 
                nome = '$nome', 
                data = '$data_evento', 
                horario_entrada = '$horario_entrada', 
                horario_saida = '$horario_saida', 
                local = '$local' 
                WHERE id = '$id'";

        if ($con->query($sql) === TRUE) {
            exit(json_encode(array('status' => 'successo')));
        } else {
            exit(json_encode(array('status' => 'Deu ruim')));
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['id'])) {
        $id = $con->real_escape_string($_GET['id']);
        $sql = $con->query("DELETE FROM eventos WHERE id = '$id'");
    
        if ($sql) {
            exit(json_encode(array('status' => 'sucesso')));
        } else {
            exit(json_encode(array('status' => 'Deu ruim')));
        }
    }
}
?>
