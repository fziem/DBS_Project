<?php
include '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
    $input = json_decode(file_get_contents('php://input'), true);
    $firstName = $input['FirstName'];
    $lastName = $input['LastName'];
    $sql = "INSERT INTO authors (\"AuthorID\",\"FirstName\",\"LastName\") VALUES (DEFAULT, '$firstName', '$lastName');";
    $result = pg_query($conn, $sql);
    if (pg_affected_rows($result) > 0) {
        http_response_code(200);
    } else {
        http_response_code(400);
    }
    pg_close($conn);
}
?>