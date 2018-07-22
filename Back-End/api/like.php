<?php
    // hashing => http://php.net/manual/es/function.password-hash.php
    // verify => http://php.net/manual/es/function.password-verify.php
    header('Access-Control-Allow-Origin: *');

    require_once("../requires/pgconnection.php");
    require_once("../requires/props.php");

    $post_id=$_REQUEST["post_id"];
    $user_id=$_REQUEST["user_id"];
    $connection = getConnection();
    $q = getQueries();

    try {
        if($connection) {
            // cleaaning up
            pg_query($connection, "DEALLOCATE ALL");

            // inserting like into database

            $like = pg_prepare($connection, "like", $q["interaction"]["like"]);
            $like = pg_execute($connection, "like", array($user_id,$post_id));
            $like = pg_fetch_assoc($like);
               
               //send succes message 
                    echo json_encode([
                        "status" => 200,
                        "res" => "succesfully liked post---".$like,
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