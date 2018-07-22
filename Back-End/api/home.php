<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Access-Control-Allow-Origin');
    header("Content-type: application/json");
    
    require_once("../requires/pgconnection.php");
    require_once("../requires/props.php");
    $id = $_GET["id"];
    $connection = getConnection();
    $q = getQueries();

    try{
        if($connection){
            $p = pg_query_params($connection, $q["homepage"]["followerspost"], array($id));
            $posts = array();
            while($r = pg_fetch_assoc($p)){
                array_push($posts, $r);
            }
            echo json_encode([
                "status" => 200,
                "data" => $posts
            ]);
        }

    }catch(Exception $e) {
        echo json_encode([
            "status" => 404,
            "message" => "Error... try later -> " + e.getMessage()
        ]);
    }

?>