<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the user's new information from the form
    $newFirstName = $_POST['firstName'];
    $newLastName = $_POST['lastName'];
    $newEmail = $_POST['email'];
    $newPhone = $_POST['phone'];
    $newSTR = $_POST['str'];
    $newPLZ = $_POST['plz'];
    $userId = $_COOKIE['userID'];

    // Make a request to the API to update the user's information
    $data = [
        'FirstName' => $newFirstName,
        'LastName' => $newLastName,
        'Email' => $newEmail,
        'Phone' => $newPhone,
        'STR' => $newSTR,
        'PLZ' => $newPLZ,
        'UserID' => $userId
    ];
    $baseUrl = $_SERVER['SERVER_NAME'];
    $apiUrl = "$baseUrl/api/user/info.php";
    
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT'); // Set the cURL method to PUT
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    $response = curl_exec($ch);
    curl_close($ch);

    // Handle the API response
    if ($response === false) {
        echo 'Error updating user information.';
    } else {
        echo '<h1>User information updated successfully.</h1><br>';
    }
}

// Get the user's current information from the API
$baseUrl = $_SERVER['SERVER_NAME'];
$apiUrl = "$baseUrl/api/user/info.php";
$userId = $_COOKIE['userID'];
$data = ['UserID' => $userId];

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
$code= curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Handle the API response
if ($response === false) {
    echo 'Error retrieving user information.';
} else {
    $userInfo = json_decode($response, true);
    if ($userInfo) {
        echo 'Current User Information:<br>';
        echo 'Email: ' . $userInfo['Email'] . '<br>';
        echo 'First Name: ' . $userInfo['FirstName'] . '<br>';
        echo 'Last Name: ' . $userInfo['LastName'] . '<br>';
        echo 'Phone: ' . $userInfo['Phone'] . '<br>';
        echo 'STR: ' . $userInfo['STR'] . '<br>';
        echo 'PLZ: ' . $userInfo['PLZ'] . '<br>';
    } else {
        echo 'Invalid user information.';
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Update User Information</title>
    <link rel="stylesheet" type="text/css" href="../styles.css">
</head>
<body>
    <h1>Update User Information</h1>
    
    <form method="POST" action="">
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required><br><br>
        
        <label for="firstName">First Name:</label>
        <input type="text" name="firstName" id="firstName" required><br><br>
        
        <label for="lastName">Last Name:</label>
        <input type="text" name="lastName" id="lastName" required><br><br>
        
        <label for="phone">Phone:</label>
        <input type="number" name="phone" id="phone" required><br><br>
        
        <label for="str">STR:</label>
        <input type="text" name="str" id="str" required><br><br>
        
        <label for="plz">PLZ:</label>
        <input type="text" name="plz" id="plz" required><br><br>
        
        <input type="submit" value="Update">
    </form>
</body>
</html>