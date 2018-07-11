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
    $msg = "";
    try {
        if($connection) {
            // cleaaning up
            pg_query($connection, "DEALLOCATE ALL");
            // inserting like into database
            $report = pg_prepare($connection, "report", $q["interaction"]["report"]);
            $report = pg_execute($connection, "report", array($post_id));
            $report = pg_fetch_assoc($report);

            // fetch how much reports does the post have after the insert 
            $report_count = pg_prepare($connection, "report_count","SELECT report_count FROM post_1 where post_id =$1  ");
            $report_count = pg_execute($connection, "report_count", array($post_id));
            $report_count = pg_fetch_assoc($report_count);
               
            if ($report_count>5){
                $delete = pg_prepare($connection, "delete", "DELETE FROM post_1 WHERE post_id = $1");
            $delete = pg_execute($connection, "delete", array($post_id));
            $delete = pg_fetch_assoc($delete);
            $msg="the post has been deleted because it was reported by many users";
            }
               //send succes message 
                    echo json_encode([
                        "status" => 200,
                        "res" => "succesfully reported post---report count: ".$report_count["report_count"]."    ".$msg,
                    ]);
        }else{
            echo json_encode([
                "status" => 400,
                "res" => "user does not exist ",
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