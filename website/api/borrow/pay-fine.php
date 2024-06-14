<?php
include '../database.php';
if($_SERVER['REQUEST_METHOD'] === "POST"){
    $input = json_decode(file_get_contents('php://input'), true);
    $borrowId = $input['BorrowID'];
    $sql = "UPDATE borrows SET \"FinePaid\"='t',\"ReturnDate\" = now()  WHERE \"BorrowID\"='$borrowId'";
    $result = pg_query($conn, $sql);
    if(pg_affected_rows($result) > 0){
        http_response_code(200);
    } else {
        http_response_code(400);
    }
}
pg_close($conn);
?>