<?php
require_once 'headers.php';
require_once 'conexao.php';

date_default_timezone_set('America/Sao_Paulo');
@session_start();

// Obter todos os orçamentos ou um específico por ID
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $con->real_escape_string($_GET['id']);
        $sql = $con->query("SELECT * FROM orcamentos WHERE id = '$id'");
        $data = $sql->fetch_assoc();
    } else {
        $data = array();

        $sql = $con->query("SELECT * FROM orcamentos");
        while ($d = $sql->fetch_assoc()) {
            $data[] = $d;
        }
    }
    exit(json_encode($data));
}

// Criar um novo orçamento
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $local = $con->real_escape_string($data->local);
    $bolo = $con->real_escape_string($data->bolo);
    $bebidas = $con->real_escape_string($data->bebidas);
    $decoracoes = $con->real_escape_string($data->decoracoes);
    $comidas = $con->real_escape_string($data->comidas);

    $sql = $con->query("INSERT INTO orcamentos (local, bolo, bebidas, decoracoes, comidas) 
                        VALUES ('$local', '$bolo', '$bebidas', '$decoracoes', '$comidas')");

    if ($sql) {
        $data->id = $con->insert_id;
        exit(json_encode($data));
    } else {
        exit(json_encode(array('status' => 'Deu ruim')));
    }
}

// Atualizar um orçamento existente
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (isset($_GET['id'])) {
        $id = $con->real_escape_string($_GET['id']);
        $data = json_decode(file_get_contents("php://input"));

        $local = $con->real_escape_string($data->local);
        $bolo = $con->real_escape_string($data->bolo);
        $bebidas = $con->real_escape_string($data->bebidas);
        $decoracoes = $con->real_escape_string($data->decoracoes);
        $comidas = $con->real_escape_string($data->comidas);

        $sql = $con->query("UPDATE orcamentos SET 
                            local = '$local', 
                            bolo = '$bolo', 
                            bebidas = '$bebidas', 
                            decoracoes = '$decoracoes', 
                            comidas = '$comidas' 
                            WHERE id = '$id'");

        if ($sql) {
            exit(json_encode(array('status' => 'successo')));
        } else {
            exit(json_encode(array('status' => 'Deu ruim')));
        }
    }
}

// Excluir um orçamento existente
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['id'])) {
        $id = $con->real_escape_string($_GET['id']);
        $sql = $con->query("DELETE FROM orcamentos WHERE id = '$id'");

        if ($sql) {
            exit(json_encode(array('status' => 'sucesso')));
        } else {
            exit(json_encode(array('status' => 'Deu ruim')));
        }
    }
}
?>
