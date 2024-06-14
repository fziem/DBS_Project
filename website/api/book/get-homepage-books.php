<?php
include '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $sql = "SELECT \"BookID\",\"ISBN\",\"Title\",\"PublisherID\",\"Year\" FROM books WHERE \"isEnabled\"=true ORDER BY RANDOM() LIMIT 10;";
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