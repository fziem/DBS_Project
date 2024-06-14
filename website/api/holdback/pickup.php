<?php
include '../database.php';
if($_SERVER['REQUEST_METHOD'] === "POST"){
    $input = json_decode(file_get_contents('php://input'), true);
    $holdBackId = $input['HoldBackID'];
    $sql = "SELECT \"HoldBackID\",\"BookID\",\"UserID\",\"HoldBackDate\",\"HoldBackTime\",\"IsPickedUp\",\"BorrowID\" FROM holdbacks WHERE \"HoldBackID\"='$holdBackId' AND \"IsPickedUp\" = 'f';";
    $result_fetch = pg_query($conn, $sql);
    if(pg_affected_rows($result_fetch) > 0){
        $row_fetch = pg_fetch_assoc($result_fetch);
        $row_fetch_bookID = $row_fetch['BookID'];
        $row_fetch_userID = $row_fetch['UserID'];
        $sql = "INSERT INTO borrows (\"BorrowID\", \"BookID\", \"UserID\", \"BorrowDate\", \"BorrowTime\", \"ReturnDate\", \"FinePaid\") VALUES 
        (DEFAULT, '$row_fetch_bookID', '$row_fetch_userID', now(), '7', to_timestamp(0), '0');";
        $sql = "UPDATE holdbacks SET \"IsPickedUp\"='t'  WHERE \"HoldBackID\"='$holdBackId'";
        $result = pg_query($conn, $sql);
        if(pg_affected_rows($result) > 0){
            http_response_code(200);
        } else {
            http_response_code(400);
        }
    } else {
        http_response_code(400);
    }
}
pg_close($conn);
?>