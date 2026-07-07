<?php
// Włączamy raportowanie błędów w razie problemów przy testach
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Dostęp zabroniony');
}

if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    
    // ==========================================
    // USTAWIENIA TWOJEJ APLIKACJI DROPBOX
    // ==========================================
    $appKey = 'es0hw61tssmr2h3'; 
    $appSecret = 'q2gbnmgfmca4bp4'; 
    $refreshToken = 'busNcZNTuVkAAAAAAAAAAZ9NY77-U0tiYeI9cCRvpMwJonA0Uc6s_7qh7XMmIxUl';

    // 1. AUTOMATYCZNE POBIERANIE ŚWIEŻEGO ACCESS TOKENA
    $tokenUrl = 'https://api.dropboxapi.com/oauth2/token';
    $tokenData = [
        'grant_type' => 'refresh_token',
        'refresh_token' => $refreshToken,
        'client_id' => $appKey,
        'client_secret' => $appSecret
    ];

    $tokenOptions = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($tokenData),
            'ignore_errors' => true
        ]
    ];

    $tokenContext  = stream_context_create($tokenOptions);
    $tokenResponse = json_decode(file_get_contents($tokenUrl, false, $tokenContext), true);

    if (!isset($tokenResponse['access_token'])) {
        http_response_code(500);
        header('Content-Type: application/json');
        die(json_encode([
            "status" => "error", 
            "message" => "Problem z odświeżeniem tokena.",
            "raw_response" => $tokenResponse
        ]));
    }

    $accessToken = $tokenResponse['access_token'];

    // 2. BEZPIECZNE WYSYŁANIE PLIKU DO DROPBOXA (Bez użycia cURL)
    $extension = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
    
    $dropboxPath = '/wesele_' . date('Y-m-d_H-i') . '_' . rand(100, 999) . '.' . $extension;

    // Pobieramy zawartość pliku tymczasowego
    $fileData = file_get_contents($_FILES['photo']['tmp_name']);

    $uploadUrl = 'https://content.dropboxapi.com/2/files/upload';
    
    // Przygotowanie argumentów dla nagłówka Dropbox-API-Arg
    $dropboxArgs = json_encode([
        "path" => $dropboxPath,
        "mode" => "add",
        "autorename" => true,
        "mute" => false
    ]);

    $uploadOptions = [
        'http' => [
            'method'  => 'POST',
            'header'  => "Authorization: Bearer " . $accessToken . "\r\n" .
                         "Content-Type: application/octet-stream\r\n" .
                         "Dropbox-API-Arg: " . $dropboxArgs . "\r\n",
            'content' => $fileData,
            'ignore_errors' => true
        ]
    ];

    $uploadContext = stream_context_create($uploadOptions);
    $uploadResponse = file_get_contents($uploadUrl, false, $uploadContext);
    
    // Pobranie kodu HTTP odpowiedzi serwera
    $httpCode = 200;
    if (isset($http_response_header)) {
        preg_match('{HTTP\/\S*\s(\d+)}', $http_response_header[0], $matches);
        $httpCode = intval($matches[1]);
    }

    header('Content-Type: application/json');

    if ($httpCode === 200) {
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => "error", 
            "http_code" => $httpCode, 
            "message" => "Dropbox odrzucił plik.",
            "details" => json_decode($uploadResponse, true) ?? $uploadResponse
        ]);
    }
} else {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(["status" => "no_file"]);
}
?>