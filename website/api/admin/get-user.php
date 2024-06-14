<?php
include '../database.php';
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['Email'];
$sql = "SELECT \"UserID\",\"GroupID\",\"Email\",\"FirstName\",\"LastName\",\"Phone\",\"STR\",\"PLZ\" FROM users WHERE \"Email\"='$email'";
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
?>