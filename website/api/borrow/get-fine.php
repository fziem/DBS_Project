<?php
include '../database.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $input = json_decode(file_get_contents('php://input'), true);
    $userId = $input['UserID'];
    $bookId = $input['BookID'];
    $sql = "SELECT \"BorrowID\",\"BorrowDate\",\"BorrowTime\",\"ReturnDate\",\"FinePaid\" FROM borrows WHERE \"UserID\"='$userId' AND \"BookID\"='$bookId' ";
    $result = pg_query($conn, $sql);
    if (pg_num_rows($result) > 0) {
        header("Cache-Control: no-cache, must-revalidate");
        header("Content-Type: application/json");
        $row = pg_fetch_assoc($result);
        if ($row['FinePaid'] == "f") {
            $borrowDate = new DateTime($row['BorrowDate']);
            $borrowTime = $row['BorrowTime'];
            $latestReturnDate = $borrowDate->add(new DateInterval('P'.$borrowTime.'D'));
            $currentDate = new DateTime();
            $daysPassed = $latestReturnDate->diff($currentDate,false)->format('%R%a');
            if ($daysPassed < 0) {
                $fine = 0;
                $row['Fine'] = $fine;
            } else {
                $fine = $daysPassed * 2;
                $row['Fine'] = $fine;
            }
        }
        $response = json_encode($row);
        echo $response;
    } else {
        http_response_code(400);
    }
    pg_close($conn);
}
?>