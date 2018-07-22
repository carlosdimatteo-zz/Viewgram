<?php
    // hashing => http://php.net/manual/es/function.password-hash.php
    // verify => http://php.net/manual/es/function.password-verify.php
    header('Access-Control-Allow-Origin: *');

    require_once("../requires/pgconnection.php");
    require_once("../requires/props.php");

    $connection = getConnection();
    $queries =getQueries();
    $id = $_REQUEST["user_id"];
    try {
        if($connection) {
            // cleaaning up
            pg_query($connection, "DEALLOCATE ALL");
            // fetching user  data from database 
            $userData = pg_prepare($connection, "UserData", $queries["profilepage"]["data"]);
            $userData = pg_execute($connection, "UserData", array($id));
            $r = pg_fetch_assoc($userData);

            // fetching users posts from database
            $posts = pg_prepare($connection, "posts", $queries["profilepage"]["posts"]);
            $posts = pg_execute($connection, "posts", array($id));
            $postArray = pg_fetch_all($posts);

            // fetch posts user has liked rom database 
            $liked_posts = pg_prepare($connection, "liked_posts", "select p.* from post_1 p inner join likes l on p.post_id=l.post_id where l.id_user = $1");
            $liked_posts = pg_execute($connection, "liked_posts", array($id));
            $liked_postArray = pg_fetch_all($liked_posts);

            // followers and following count 
            
            $followers = pg_prepare($connection, "followers_count", $queries["profilepage"]["followers"]);
            $followers = pg_execute($connection, "followers_count", array($id));
            $followers = pg_fetch_assoc($followers)["count"];
            
            $r["followers_count"]=$followers;

            $following = pg_prepare($connection, "following_count", $queries["profilepage"]["following"]);
            $following = pg_execute($connection, "following_count", array($id));
            $following = pg_fetch_assoc($following)["count"];
            
            $r["following_count"]=$following;


            //fetch number of posts 
            $postscount = pg_prepare($connection, "postscount", $queries["profilepage"]["postscount"]);
            $postscount = pg_execute($connection, "postscount", array($id));
            $postscount = pg_fetch_assoc($postscount)["count"];
            
            $r["postscount"]=$postscount;


            // fetch followers username and id from database 
            $followers = pg_prepare($connection, "followers", "SELECT a.username,a.id_user FROM app_user a INNER JOIN followers_list b ON a.id_user = b.follower_id_user WHERE b.followed_id_user = $1");
            $followers = pg_execute($connection, "followers", array($id));
            $followers = pg_fetch_all($followers);
            
            $r["followers"]=$followers;
            

            // fetch following username and id from database 
            $following = pg_prepare($connection, "following", "SELECT a.username,a.id_user FROM app_user a INNER JOIN followers_list b ON a.id_user = b.followed_id_user WHERE b.follower_id_user = $1");
            $following = pg_execute($connection, "following", array($id));
            $following = pg_fetch_all($following);
            
            $r["following"]=($following);

            if($r){
                echo json_encode([
                    "status" => 200,
                    "data"=>$r,
                    "posts"=>$postArray,

                    "liked_posts"=>$liked_postArray,

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