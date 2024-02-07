<?php
require_once 'headers.php';
require_once 'conexao.php';

date_default_timezone_set('America/Sao_Paulo');
@session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $con->real_escape_string($_GET['id']);
        $sql = $con->query("SELECT * FROM clientes WHERE id = '$id'");
        $data = $sql->fetch_assoc();
    } else if (isset($_GET['email'])) {
        $email = $con->real_escape_string($_GET['email']);
        $sql = $con->query("SELECT * FROM clientes WHERE email = '$email'");
        $data = $sql->fetch_assoc();
    } else if (isset($_GET['cpf'])) {
        $cpf = $con->real_escape_string($_GET['cpf']);
        $sql = $con->query("SELECT * FROM clientes WHERE cpf = '$cpf'");
        $data = $sql->fetch_assoc();
    } else {
        $data = array();
        $sql = $con->query("SELECT * FROM clientes");
        while ($d = $sql->fetch_assoc()) {
            $data[] = $d;
        }
    }
    exit(json_encode($data));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_GET['login'])) {
        $data = json_decode(file_get_contents("php://input"));
        if (!isset($data->email) || !isset($data->senha)) {
            http_response_code(400);
            exit(json_encode(['error' => 'E-mail e senha são obrigatórios para o login.']));
        }
        $email = $con->real_escape_string($data->email);
        $senha = $con->real_escape_string($data->senha);
        $sql = $con->query("SELECT * FROM clientes WHERE email = '$email' LIMIT 1");


        $userData = $sql->fetch_assoc();
        $hashed_password = $userData['senha'];
       

        // Remove a senha criptografada dos dados do cliente antes de retornar
        unset($userData['senha']);

        exit(json_encode($userData));
    } else {
        $data = json_decode(file_get_contents("php://input"));
        $senha = $con->real_escape_string(password_hash($data->senha, PASSWORD_DEFAULT)); // Criptografa a senha
        $sql = $con->query("INSERT INTO clientes (nome, email, cpf, senha, nivel2) VALUES ('".$data->nome."','".$data->email."','".$data->cpf."','".$senha."','".$data->nivel2."')");
        if ($sql) {
            $data->id = $con->insert_id;
            exit(json_encode($data));
        } else {
            exit(json_encode(array('status' => 'Deu ruim')));
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (isset($_GET['id'])) {
        $id = $con->real_escape_string($_GET['id']);
        $data = json_decode(file_get_contents("php://input"));
        $senha = $con->real_escape_string(password_hash($data->senha, PASSWORD_DEFAULT)); // Criptografa a senha
        $sql = $con->query("UPDATE clientes SET nome = '".$data->nome."', email = '".$data->email."', cpf = '".$data->cpf."',  senha = '".$senha."', nivel2 = '".$data->nivel2."' WHERE id = '$id'");
        if ($sql) {
            exit(json_encode(array('status' => 'successo')));
        } else {
            exit(json_encode(array('status' => 'Deu ruim')));
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['id'])) {
        $id = $con->real_escape_string($_GET['id']);
        $sql = $con->query("DELETE FROM clientes WHERE id = '$id'");
        if ($sql) {
            exit(json_encode(array('status' => 'sucesso')));
        } else {
            exit(json_encode(array('status' => 'Deu ruim')));
        }
    }
}
?>
