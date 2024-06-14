<?php
include '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $input = json_decode(file_get_contents('php://input'), true);
    $userId = $input['UserID'];
    $bookId = $input['BookID'];
    $sql = "SELECT \"BorrowID\",\"BorrowDate\",\"BorrowTime\",\"ReturnDate\" FROM borrows WHERE \"UserID\"='$userId' AND \"BookID\"='$bookId' AND \"FinePaid\"=false; ";
    $result = pg_query($conn, $sql);
    if (pg_num_rows($result) > 0) {
        header("Cache-Control: no-cache, must-revalidate");
        header("Content-Type: application/json");
        $row = pg_fetch_assoc($result);
        $response = json_encode($row);
        echo $response;
    } else {
        http_response_code(400);
    }
    pg_close($conn);
}
?>