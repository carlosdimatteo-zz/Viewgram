<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"); 
    
    require_once("../requires/pgconnection.php");
    $body = file_get_contents("php://input");
    $key = json_decode($body,true);
    $data = [
        "key" => $key["key"]
    ];
    $connection = getConnection();

    try{
        if($connection) {
            if(!$key["ht"]) {
                $results = pg_query($connection, "SELECT * FROM app_user WHERE username LIKE '%".$data["key"]."%'");
            } else {
                $ht_id = pg_query_params($connection, "SELECT hashtag_id FROM hashtags WHERE hashtag = $1", array($data["key"]));
                $htid = pg_fetch_assoc($ht_id);
                // echo json_encode($htid["hashtag_id"]);
                $results = pg_query_params($connection, "SELECT * FROM post_1 p INNER JOIN post_hashtag h ON p.post_id = h.post_id WHERE h.hashtag_id = $1", array(intval($htid["hashtag_id"])));
            }
            $results=pg_fetch_all($results);
            echo json_encode([
                "status"=>200,
                "data"=>$results
            ]);
        } else {
            echo json_encode([
                "status" => 404,
                "msg" => "Error while connecting"
            ]);            
        }
    } catch (Exception $e) {
        echo json_encode([
            "status" => 404,
            "msg" => "Error while connecting"
        ]);
    }

?>