<?php

// echo "hello"
header("Content-type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case'GET':
        handleOptions();
        // echo'{"result": "get received"}';
        // echo"get";
        break;
    case'POST':
        post();
        // echo"post";
        // echo'{"result": "post received"}';
        break;
    case'PUT':
        // echo"put";
        echo'{"result": "put received"}';
        break;
    case'DELETE':
        // echo"delete";
        echo'{"result": "delete received"}';

         break;
    default:

        break;
}

//view all data from db
function handleOptions() {
    include 'db.php';
    $sql = "SELECT * FROM test_table";
    // $result = $conn->query($sql);
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result) > 0){
        $rows = array();
        while($r = mysqli_fetch_assoc($result)){
            $rows["result"][] = $r;
            // $rows[] = $r;//araay of objects
        }
        echo json_encode($rows);
    }else{
        echo '{"result": "no data found"}';
    }

}

//insert data into db
function post(){
    include 'db.php';
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data["name"];
    $phone = $data["phone"];

    $sql = "INSERT INTO test_table (name,phone,datetime) VALUES('$name', '$phone',NOW())";
    
    if($conn->query($sql) === TRUE){
        echo '{"result": "data inserted successfully"}';
    }else{
        echo '{"result": "data insertion failed"}';
    }


}

?>