<?php
include '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $input = json_decode(file_get_contents('php://input'), true);
    $bookId = $input['BookID'];
    $sql = "SELECT \"BookID\",\"ISBN\",\"Title\",\"PublisherID\",\"Year\" FROM books WHERE \"BookID\"='$bookId' AND \"isEnabled\"=true; ";
    $result = pg_query($conn, $sql);
    if (pg_num_rows($result) > 0) {
        header("Cache-Control: no-cache, must-revalidate");
        header("Content-Type: application/json");
        $row = pg_fetch_all($result);
        $response = json_encode($row);
        echo $response;
    } else {
        http_response_code(400);
    }
    pg_close($conn);
}
?>