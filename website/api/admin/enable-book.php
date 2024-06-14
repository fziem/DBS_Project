<?php
include '../database.php';
$input = json_decode(file_get_contents('php://input'), true);
$bookID = $input['BookID'];
$sql = "UPDATE books SET \"isEnabled\" = TRUE  WHERE \"BookID\" = '$bookID' AND NOT \"isEnabled\"";
$result = pg_query($conn, $sql);
if (pg_affected_rows($result) > 0) {
    http_response_code(200);
} else {
    http_response_code(400);
}
pg_close($conn);
?>