<?php
include 'db.php';
// Set response header to JSON
header('Content-Type: application/json');

// Get data from JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Check if JSON data is provided
if ($data) {
    $id = $data['id'] ?? null;
} else {
    // Fallback to form data (x-www-form-urlencoded)
    $id = $_POST['id'] ?? null;
}

// Validate ID
if ($id) {
    $sql = "DELETE FROM test_table WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Record deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error deleting record: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Missing id"]);
}

$conn->close();

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $id = $_POST['id'];

//     $sql = "DELETE FROM test_table WHERE id=$id";

//     if ($conn->query($sql) === TRUE) {
//         echo "Record deleted successfully";
//     } else {
//         echo "Error deleting record: " . $conn->error;
//     }

//     $conn->close();
// }
?>
