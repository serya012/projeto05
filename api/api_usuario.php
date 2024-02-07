<?php
require_once 'headers.php';
require_once 'conexao.php';

date_default_timezone_set('America/Sao_Paulo');
@session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $con->real_escape_string($_GET['id']);
        $sql = $con->query("SELECT * FROM usuarios WHERE id = '$id'");
        $data = $sql->fetch_assoc();
    } else if (isset($_GET['email'])) {
        $email = $con->real_escape_string($_GET['email']);
        $sql = $con->query("SELECT * FROM usuarios WHERE email = '$email'");
        $data = $sql->fetch_assoc();
    } else if (isset($_GET['cpf'])) {
        $cpf = $con->real_escape_string($_GET['cpf']);
        $sql = $con->query("SELECT * FROM usuarios WHERE cpf = '$cpf'");
        $data = $sql->fetch_assoc();
    } else {
        $data = array();
        $sql = $con->query("SELECT * FROM usuarios");
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
        $sql = $con->query("SELECT * FROM usuarios WHERE email = '$email' LIMIT 1");

        if ($sql->num_rows !== 1) {
            http_response_code(401);
            exit(json_encode(['error' => 'Email ou senha inválidos.']));
        }

        $userData = $sql->fetch_assoc();
        $hashed_password = $userData['senha'];
        if (!password_verify($senha, $hashed_password)) {
            http_response_code(401);
            exit(json_encode(['error' => 'Email ou senha inválidos.']));
        }

        // Remove a senha criptografada dos dados do usuário antes de retornar
        unset($userData['senha']);

        exit(json_encode($userData));
    } else {
        $data = json_decode(file_get_contents("php://input"));
        $senha = $con->real_escape_string(password_hash($data->senha, PASSWORD_DEFAULT)); // Criptografa a senha
        $sql = $con->query("INSERT INTO usuarios (nome, email, cpf, senha, nivel1) VALUES ('".$data->nome."','".$data->email."','".$data->cpf."','".$senha."','".$data->nivel1."')");
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
        $sql = $con->query("UPDATE usuarios SET nome = '".$data->nome."', email = '".$data->email."', cpf = '".$data->cpf."',  senha = '".$senha."', nivel1 = '".$data->nivel1."' WHERE id = '$id'");
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
        $sql = $con->query("DELETE FROM usuarios WHERE id = '$id'");
        if ($sql) {
            exit(json_encode(array('status' => 'sucesso')));
        } else {
            exit(json_encode(array('status' => 'Deu ruim')));
        }
    }
}
?>
