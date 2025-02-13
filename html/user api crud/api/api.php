<?php
header("Content-Type: application/json");
include '../db/db.php';
// ../db/db.php

// Debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Fetch Data
        $sql = "SELECT * FROM contacts";
        $result = $conn->query($sql);

        $data = [];
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
        break;

    case 'POST':
        // Create Data
        $input = json_decode(file_get_contents("php://input"), true);
        $name = $input['name'];
        $phone = $input['phone'];

        $stmt = $conn->prepare("INSERT INTO contacts (name, phone_number) VALUES (?, ?)");
        $stmt->bind_param("ss", $name, $phone);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Record created successfully"]);
        } else {
            echo json_encode(["message" => "Error creating record"]);
        }
        break;

    case 'PUT':
        // Update Data
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'];
        $name = $input['name'];
        $phone = $input['phone'];

        $stmt = $conn->prepare("UPDATE contacts SET name=?, phone_number=? WHERE id=?");
        $stmt->bind_param("ssi", $name, $phone, $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Record updated successfully"]);
        } else {
            echo json_encode(["message" => "Error updating record"]);
        }
        break;

    case 'DELETE':
        // Delete Data
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'];

        $stmt = $conn->prepare("DELETE FROM contacts WHERE id=?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Record deleted successfully"]);
        } else {
            echo json_encode(["message" => "Error deleting record"]);
        }
        break;

    default:
        echo json_encode(["message" => "Invalid Request"]);
        break;
}

$conn->close();
?>
