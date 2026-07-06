<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Dostęp zabroniony');
}

if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    
    // !!! TUTAJ WKLEJ SWÓJ GENEROWANY TOKEN Z DROPBOX DEVELOPER APP CONSOLE !!!
    $accessToken = 'TWÓJ_TOKEN_Z_DROPBOXA'; 
    
    // Unikalna nazwa pliku (np. wesele_171500000_432.jpg)
    $extension = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
    $dropboxPath = '/wesele_' . time() . '_' . rand(100, 999) . '.' . $extension;

    $fp = fopen($_FILES['photo']['tmp_name'], 'rb');
    $size = filesize($_FILES['photo']['tmp_name']);

    $headers = array(
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/octet-stream',
        'Dropbox-API-Arg: {"path":"' . $dropboxPath . '","mode":"add","autorename":true,"mute":false}'
    );

    $ch = curl_init('https://content.dropboxapi.com/2/files/upload');
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_PUT, true);
    curl_setopt($ch, CURLOPT_INFILE, $fp);
    curl_setopt($ch, CURLOPT_INFILESIZE, $size);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); // Poprawione
    
    curl_close($ch);
    fclose($fp);

    if ($httpCode === 200) {
        http_response_code(200);
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "details" => $response]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "no_file"]);
}
?>
