<?php
include '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
    $input = json_decode(file_get_contents('php://input'), true);
    $userId = $input['UserID'];
    $bookId = $input['BookID'];
    $sql = "INSERT INTO borrows (\"BorrowID\", \"BookID\", \"UserID\", \"BorrowDate\", \"BorrowTime\", \"ReturnDate\", \"FinePaid\") VALUES 
    (DEFAULT, '$bookId', '$userId', now(), '7', to_timestamp(0), '0');";
    $result = pg_query($conn, $sql);
    if (pg_affected_rows($result) > 0) {
        http_response_code(200);
    } else {
        http_response_code(400);
    }
    pg_close($conn);
}
?>