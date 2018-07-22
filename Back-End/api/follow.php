<?php
    // hashing => http://php.net/manual/es/function.password-hash.php
    // verify => http://php.net/manual/es/function.password-verify.php
    header('Access-Control-Allow-Origin: *');

    require_once("../requires/pgconnection.php");
    require_once("../requires/props.php");

    $follower_id = $_REQUEST["follower_id"];
    $followed_id = $_REQUEST["followed_id"];
    $connection = getConnection();
    $q = getQueries();

    try {
        if($connection) {
            // cleaaning up
            pg_query($connection, "DEALLOCATE ALL");
            // inserting follow into database
            $follow = pg_prepare($connection, "follow", "INSERT INTO followers_list values($1,$2) ");
            $follow = pg_execute($connection, "follow", array($followed_id,$follower_id));
            $follow = pg_fetch_assoc($follow);
               
               //send succes message 
                    echo json_encode([
                        "status" => 200,
                        "res" => "succesfully followed user---".$follow,
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