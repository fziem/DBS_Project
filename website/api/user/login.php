<?php
include '../database.php';
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

$email = $data['Email'];
$password = $data['Pass'];

$sql = "SELECT \"UserID\" FROM users WHERE \"Email\"='$email' AND \"Pass\" = '$password' AND NOT \"GroupID\" = 0";
$result = pg_query($conn, $sql);
if (pg_num_rows($result) > 0) {
    header("Cache-Control: no-cache, must-revalidate");
    header("Content-Type: application/json");
    header("X-Expires-After: " . date(DATE_RFC2822, strtotime("1 hour")));
    $row = pg_fetch_assoc($result);
    $response = json_encode($row);
    echo $response;
} else {
    http_response_code(400);
}
pg_close($conn);
?>
