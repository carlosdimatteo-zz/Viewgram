<?php
    // hashing => http://php.net/manual/es/function.password-hash.php
    // verify => http://php.net/manual/es/function.password-verify.php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"); 
    require_once("../requires/pgconnection.php");
    require_once("../requires/props.php");
    $body = file_get_contents('php://input');
    $bodydata = json_decode($body, true);
    $data = [
        
        "comment_text" => $bodydata["comment_text"],
        
        "id_user"=>$bodydata["id_user"],
        
        "post_id"=>$bodydata["post_id"],
        
        "created_at"=>$bodydata["created_at"]
    ];

    $connection = getConnection();
    $q = getQueries();

    try {
        if($connection) {
            // cleaaning up
            pg_query($connection, "DEALLOCATE ALL");
            // inserting comment into database  
            $comment = pg_prepare($connection, "comment", $q["interaction"]["comment"]);

            $comment = pg_execute($connection, "comment", array($data["post_id"],$data["id_user"],$data["created_at"],$data["comment_text"]));
            
            $comment = pg_fetch_assoc($comment);
               
               //send success message 
                    echo json_encode([
                        "status" => 200,
                        "res" => "succesfully commented post---".$comment,
                    ]);
        }else{
            echo json_encode([
                "status" => 400,
                "res" => "user does not exist, please register ",
            ]);

        }
    } catch (Exception $e){
        // error in database connection
        echo json_encode([
            "status" => 400,
            "res" => "Error -> " + $e->getMessage()
        ]);
    }

?>

$body = file_get_contents('php://input');
    $bodydata = json_decode($body, true);
    $data = [
        "name" => $bodydata["name"],
        "username" => $bodydata["username"],
        "password" => password_hash($bodydata["password"], PASSWORD_DEFAULT),
        "email" => $bodydata["email"],
        "biography" => $bodydata["bio"]
    ];