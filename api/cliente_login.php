<?php

// api_login.php

// api_login_cliente.php

require_once 'headers.php';
require_once 'conexao.php';

// Verifica se a requisição é do tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe os dados enviados pelo cliente
    $data = json_decode(file_get_contents("php://input"));

    // Verifica se foram fornecidos tanto email_cliente quanto senha_cliente
    if (isset($data->email_cliente) && isset($data->senha_cliente)) {
        $email = $con->real_escape_string($data->email_cliente);
        $senha = $con->real_escape_string($data->senha_cliente);

        // Consulta o banco de dados para verificar se as credenciais de cliente estão corretas
        $sql_cliente = $con->query("SELECT * FROM cliente WHERE email = '$email'");
        $cliente = $sql_cliente->fetch_assoc();

        // Verifica se o cliente foi encontrado e se a senha está correta
        if ($cliente && password_verify($senha, $cliente['senha'])) {
            // Cliente autenticado com sucesso
            http_response_code(200);
            exit(json_encode(['message' => 'Login de cliente bem-sucedido']));
        } else {
            // Credenciais inválidas
            http_response_code(401); // Código de status HTTP 401 Unauthorized
            exit(json_encode(['message' => 'Email ou senha de cliente inválidos']));
        }
    } else {
        // Dados incompletos
        http_response_code(400); // Código de status HTTP 400 Bad Request
        exit(json_encode(['message' => 'Email e senha de cliente são obrigatórios']));
    }
} else {
    // Método de requisição inválido
    http_response_code(405); // Código de status HTTP 405 Method Not Allowed
    exit(json_encode(['message' => 'Método de requisição não permitido']));
}


?>
