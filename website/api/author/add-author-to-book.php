<?php
include '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
    $input = json_decode(file_get_contents('php://input'), true);
    $isbn = $input['ISBN'];
    $authorID = $input['AuthorID'];
    $authorPrio = $input['AuthorPrio'];
    $sql = "INSERT INTO \"authorOfBook\" (\"ID\",\"ISBN\",\"AuthorID\",\"AuthorPrio\") VALUES (DEFAULT, '$isbn', '$authorID', '$authorPrio');";
    $result = pg_query($conn, $sql);
    if (pg_affected_rows($result) > 0) {
        http_response_code(200);
    } else {
        http_response_code(400);
    }
    pg_close($conn);
}
?>