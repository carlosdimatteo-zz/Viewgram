<?php
    // hashing => http://php.net/manual/es/function.password-hash.php
    // verify => http://php.net/manual/es/function.password-verify.php
    header('Access-Control-Allow-Origin: *');        

    require_once("../requires/pgconnection.php");
    require_once("../requires/props.php");

    $connection = getConnection();
    $queries = getQueries();
    $post_id = $_REQUEST["post_id"];
    $user_id = $_REQUEST["user_id"];
    try {
        if($connection) {
            // cleaaning up
            pg_query($connection, "DEALLOCATE ALL");
            // fetching post  data from database 
            $postData = pg_prepare($connection, "postData", $queries["postpage"]["data"]);
            $postData = pg_execute($connection, "postData", array($post_id));
            $postData = pg_fetch_assoc($postData);
                // fetch number of likes on post
            $likes = pg_prepare($connection, "likes", $queries["postpage"]["getlikes"]);
            $likes = pg_execute($connection, "likes", array($post_id));
            $likes = pg_fetch_assoc($likes)["count"];

            // fetch post comments
            $comments = pg_prepare($connection, "comments", $queries["postpage"]["getcomments"]);
            $comments = pg_execute($connection, "comments", array($post_id));
            $comments = pg_fetch_all($comments);

            // fetch post tags
            $tags = pg_prepare($connection, "tags", $queries["postpage"]["hashtags"]);
            $tags = pg_execute($connection, "tags", array($post_id));
            $tags = pg_fetch_all($tags);

            // fetch post tags
            $taggedUsers = pg_prepare($connection, "taggedUsers", $queries["postpage"]["taggedUsers"]);
            $taggedUsers = pg_execute($connection, "taggedUsers", array($post_id));
            $taggedUsers = pg_fetch_all($taggedUsers);
            
            // query if user has liked the post 
            $liked = pg_prepare($connection, "liked", $queries["postpage"]["user_liked"]);
            $liked = pg_execute($connection, "liked", array($post_id,$user_id));
            $liked = pg_fetch_assoc($liked);
                $postData["likes"]=$likes;
                $postData["comments"]=$comments;
                $postData["tags"]=$tags;
                $postData["taggedUsers"]=$taggedUsers;
                $postData["user_liked"]= ($liked) ? true:false;
            
            if($postData){
                echo json_encode([
                    "status" => 200,
                    "data"=>$postData,
                    "res" => "User Data fetched successfully",
                ]);
                }else{
                echo json_encode([
                    "status" => 400,
                    "res" => "could not fetch user data",
                ]);
                }
        
        } else{
            //if user does not exist
            echo json_encode([
                "status" => 400,
                "res" => "error connecting to database ",
            ]);
        }
    } catch (Exception $e){
        //error in database connection
        echo json_encode([
            "status" => 400,
            "res" => "Error -> " + $e->getMessage()
        ]);
    }

?>