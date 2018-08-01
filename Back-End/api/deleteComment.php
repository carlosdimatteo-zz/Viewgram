<?php
    // hashing => http://php.net/manual/es/function.password-hash.php
    // verify => http://php.net/manual/es/function.password-verify.php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Access-Control-Allow-Origin');
    header("Content-type: application/json");
    
    require_once("../requires/pgconnection.php");
    require_once("../requires/props.php");

    $body = file_get_contents('php://input');
    $data = json_decode($body, true);

    $post_id = $data["post_id"];
    $id_user = $data["id_user"];
    $comment_id = $data["comment_id"];

    $connection = getConnection();
    $q = getQueries();
        
    try {
        if($connection) {
            // cleaaning up
            pg_query($connection, "DEALLOCATE ALL");

            // deleting COMMENT from database
            $deletecomment = pg_delete($connection, 'comments', ['post_id' => $post_id, 'comment_id' => $comment_id]);
               //send success message 
                if($deletecomment) {
                    echo json_encode([
                        "status" => 200,
                        "res" => "Comment deleted successfully",
                    ]);
                } else {
                    echo json_encode([
                        "status" => 400,
                        "res" => "Error while deleting comment",
                    ]);                    
                }
                    
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