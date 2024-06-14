<?php
include '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $sql = "INSERT INTO users (\"UserID\",\"GroupID\",\"Email\",\"Pass\",\"FirstName\",\"LastName\",\"Phone\",\"STR\",\"PLZ\") VALUES
    (DEFAULT, '1', '".$input['Email']."', '".$input['Pass']."', '".$input['FirstName']."', '".$input['LastName']."', '".$input['Phone']."', '".$input['STR']."', '".$input['PLZ']."');";
    $result = pg_query($conn, $sql);
    if (pg_affected_rows($result) > 0) {
        http_response_code(200);
    } else {
        http_response_code(403);
    }
    pg_close($conn);
}
?>