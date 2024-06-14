<?php
include '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
    $input = json_decode(file_get_contents('php://input'), true);
    $publisherName = $input['PublisherName'];
    $sql = "INSERT INTO publishers (\"PublisherID\",\"PublisherName\") VALUES (DEFAULT, '$publisherName');";
    $result = pg_query($conn, $sql);
    if (pg_affected_rows($result) > 0) {
        http_response_code(200);
    } else {
        http_response_code(400);
    }
    pg_close($conn);
}
?>