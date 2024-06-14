<?php
include '../database.php';
$input = json_decode(file_get_contents('php://input'), true);
$userID = $input['UserID'];
$sql = "UPDATE users SET \"GroupID\" = 1 WHERE \"UserID\" = '$userID' AND \"GroupID\" = 0"; 
$result = pg_query($conn, $sql);
if (pg_affected_rows($result) > 0) {
    http_response_code(200);
} else {
    http_response_code(400);
}
pg_close($conn);
?>