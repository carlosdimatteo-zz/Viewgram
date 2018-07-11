<?php
    // hashing => http://php.net/manual/es/function.password-hash.php
    // verify => http://php.net/manual/es/function.password-verify.php
    header('Access-Control-Allow-Origin: *');
    
    require_once("../requires/pgconnection.php");
    require_once("../requires/props.php");

    $post_id = $_REQUEST["post_id"];
    $user_id = $_REQUEST["user_id"];
    $connection = getConnection();
    $q = getQueries();

    try {
        if($connection) {
            // cleaaning up
            pg_query($connection, "DEALLOCATE ALL");

            // deleting like from database
            $dislike = pg_prepare($connection, "dislike", $q["interaction"]["dislike"]);
            $dislike = pg_execute($connection, "dislike", array($user_id,$post_id));
            $dislike = pg_fetch_assoc($dislike);
               
               //send succes message 
                    echo json_encode([
                        "status" => 200,
                        "res" => "succesfully disliked post---".$dislike,
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