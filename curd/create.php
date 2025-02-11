<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['phone'];

    $sql = "INSERT INTO test_table (name, phone) VALUES ('$name', '$phone')";

    if ($conn->query($sql) === TRUE) {
        echo "Record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}

/*
// Set response header to JSON
header('Content-Type: application/json');

// Get data from JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Check if name and phone exist
if (isset($data['name']) && isset($data['phone'])) {
    $name = $data['name'];
    $phone = $data['phone'];

    $sql = "INSERT INTO test_table (name, phone) VALUES ('$name', '$phone')";

    if ($conn->query($sql) === TRUE) {
        echo "Record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Missing required fields";
}

$conn->close();
*/
?>
