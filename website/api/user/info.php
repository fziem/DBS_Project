<?php
include '../database.php';
//TODO replace UserID with session token
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $userId = $input['UserID'];
    $sql = "SELECT \"Email\",\"FirstName\",\"LastName\",\"Phone\",\"STR\",\"PLZ\" FROM users WHERE \"UserID\"='$userId'";
    $result = pg_query($conn, $sql);
    if (pg_num_rows($result) > 0) {
        header("Cache-Control: no-cache, must-revalidate");
        header("Content-Type: application/json");
        $row = pg_fetch_assoc($result);
        $response = json_encode($row);
        echo $response;
    } else {
        http_response_code(403);
    }
    pg_close($conn);
}
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $sql = "UPDATE users SET \"Email\"='{$input['Email']}',\"FirstName\"='{$input['FirstName']}',\"LastName\"='{$input['LastName']}',\"Phone\"='{$input['Phone']}',\"STR\"='{$input['STR']}',\"PLZ\"='{$input['PLZ']}' WHERE \"UserID\"='{$input['UserID']}'";
    $result = pg_query($conn, $sql);
    if (pg_affected_rows($result) > 0) {
        http_response_code(200);
    } else {
        http_response_code(403);
    }
    pg_close($conn);
}
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    $sql = "DELETE FROM users WHERE \"UserID\"='{$input['UserID']}'";
    $result = pg_query($conn, $sql);
    if (pg_affected_rows($result) > 0) {
        http_response_code(200);
    } else {
        http_response_code(403);
    }
    pg_close($conn);
}

?>
