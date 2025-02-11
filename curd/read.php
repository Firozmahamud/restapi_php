<?php
include 'db.php';
header('Content-Type: application/json');

$sql = "SELECT * FROM test_table";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = [];

    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // echo json_encode($data);
    echo json_encode($data, JSON_PRETTY_PRINT);
} else {
    echo "No records found";
}

$conn->close();
?>
