<?php

$servername = "localhost";
$dbname = "demo_api";
$username = "root";
$password = " ";

//now we are creating a connection 

$conn = new mysqli($servername, $username, $password, $dbname);

//check db connection
/*
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
    echo "Connected successfully with DB";
}
    */

?>