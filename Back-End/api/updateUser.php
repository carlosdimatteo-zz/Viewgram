<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Access-Control-Allow-Origin');
    header("Content-type: application/json");
    require_once("../requires/pgconnection.php");
    require_once("../requires/props.php");
    $body = file_get_contents('php://input');
    $bodyData = json_decode($body, true);
    $queries=getQueries();
    // echo json_encode($bodyData);

    $q1 = $queries["profilepage"]["updatenoavatar"];
    // $q2 = "UPDATE app_user SET name = $1, username = $2, email = $3, biography = $4, avatar = $5 WHERE id_user = $6";
    // $mydata1 = array($bodyData["name"], bodyDdata["username"], $bodyData["email"], $bodyData["biography"], $bodyData["userid"]);
    $finalq;
    $mydata;
//    (($bodyData['haveAvatar']) ? $finalq = $q2 : $finalq = $q1);
    // if($bodyData['haveAvatar']) {
    //     $finalq = $q2;
    //     $mydata = array($bodyData["name"], bodyDdata["username"], $bodyData["email"], $bodyData["biography"], $bodyData["path"], $bodyData["userid"]);
    // } else {
        // $finalq = $q1;
        $mydata = array($bodyData["name"], $bodyData["username"], $bodyData["email"], $bodyData["biography"], $bodyData["id_user"]);
    // }
    $connection = getConnection();
        
        try {
            if($connection) {
                pg_query($connection,"DEALLOCATE ALL");
                $results=pg_prepare($connection,"updateUser",$q1);
                $results = pg_execute($connection,"updateUser",$mydata);
                $r = pg_fetch_assoc($results);
                if($results) {
                    echo json_encode([
                        "status" => 200,
                        "msg" => "Updated user in DB"
                    ]);                    
                }else{
                    echo json_encode([
                        "status" => 400,
                        "msg" => "Could not update DB"
                    ]);   

                }
            } else {
                echo json_encode([
                    "status" => 404,
                    "msg" => "Error while connection to database..."
                ]);
            }
        } catch (Exception $e) {
            echo json_encode([
                "status" => 404,
                "msg" => "Exception... -> " . $e->getMessage()
            ]);
        }

?>