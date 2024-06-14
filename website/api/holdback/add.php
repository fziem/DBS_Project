<?php
include '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
    $input = json_decode(file_get_contents('php://input'), true);
    $userId = $input['UserID'];
    $bookId = $input['BookID'];
    $sql = "INSERT INTO holdbacks (\"HoldBackID\",\"BookID\",\"UserID\",\"HoldBackDate\",\"HoldBackTime\",\"IsPickedUp\",\"BorrowID\") VALUES 
    (DEFAULT, '$bookId', '$userId', now(), '7', FALSE, NULL);";
    $result = pg_query($conn, $sql);
    if (pg_affected_rows($result) > 0) {
        http_response_code(200);
    } else {
        http_response_code(400);
    }
    pg_close($conn);
}
?>