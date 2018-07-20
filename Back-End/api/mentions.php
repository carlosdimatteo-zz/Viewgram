<?php
    header('Access-Control-Allow-Origin: *');
    
    require_once("../requires/pgconnection.php");
    $connection = getConnection();
    $id = $_GET["userid"];
    try{
        if($connection) {
            $results = pg_query_params($connection, "SELECT * FROM post_1 a INNER JOIN tagged_user b ON a.post_id = b.post_id WHERE b.id_user = $1 ORDER BY a.created_at DESC", array($id));
            // echo json_encode(pg_fetch_assoc($results));
            $data = array();
            while($row = pg_fetch_assoc($results)) {
                array_push($data, $row);
            }
            echo json_encode([
                "status" => 200,
                "data" => $data
            ]);
        }
    } catch (Exception $e) {
        json_encode([
            "status" => 404,
            "message" => "Error -> " + $e->getMessage()
        ]);
    }


?>