<?php

// api_login.php

// api_login_usuario.php

require_once 'headers.php';
require_once 'conexao.php';

// Verifica se a requisição é do tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe os dados enviados pelo usuário
    $data = json_decode(file_get_contents("php://input"));

    // Verifica se foram fornecidos tanto email_usuario quanto senha_usuario
    if (isset($data->email_usuario) && isset($data->senha_usuario)) {
        $email = $con->real_escape_string($data->email_usuario);
        $senha = $con->real_escape_string($data->senha_usuario);

        // Consulta o banco de dados para verificar se as credenciais de usuário estão corretas
        $sql_usuario = $con->query("SELECT * FROM usuarios WHERE email = '$email'");
        $usuario = $sql_usuario->fetch_assoc();

        // Verifica se o usuário foi encontrado e se a senha está correta
        if ($usuario && password_verify($senha, $usuario['senha'])) {
            // Usuário autenticado com sucesso
            http_response_code(200);
            exit(json_encode(['message' => 'Login de usuário bem-sucedido']));
        } else {
            // Credenciais inválidas
            http_response_code(401); // Código de status HTTP 401 Unauthorized
            exit(json_encode(['message' => 'Email ou senha de usuário inválidos']));
        }
    } else {
        // Dados incompletos
        http_response_code(400); // Código de status HTTP 400 Bad Request
        exit(json_encode(['message' => 'Email e senha de usuário são obrigatórios']));
    }
} else {
    // Método de requisição inválido
    http_response_code(405); // Código de status HTTP 405 Method Not Allowed
    exit(json_encode(['message' => 'Método de requisição não permitido']));
}


?>
