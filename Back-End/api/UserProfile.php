
<?php
    // hashing => http://php.net/manual/es/function.password-hash.php
    // verify => http://php.net/manual/es/function.password-verify.php
    header('Access-Control-Allow-Origin: *');        

    require_once("../requires/pgconnection.php");
    require_once("../requires/props.php");

    $connection = getConnection();
    $queries = getQueries();
    $id_user = $_REQUEST["user_id"];
    $id_nav_user = $_REQUEST["nav_user"];
    try {
        if($connection) {
            // cleaaning up
            pg_query($connection, "DEALLOCATE ALL");
            // fetching user  data from database 
            $userData = pg_prepare($connection, "UserData", $queries["profilepage"]["data"]);
            $userData = pg_execute($connection, "UserData", array($id_user));
            $r = pg_fetch_assoc($userData);

            // fetching users posts from database
            $posts = pg_prepare($connection, "posts", $queries["profilepage"]["posts"]);
            $posts = pg_execute($connection, "posts", array($id_user));
            $postArray = pg_fetch_all($posts);

            // followers and following count 
            
            $followers = pg_prepare($connection, "followers", $queries["profilepage"]["followers"]);
            $followers = pg_execute($connection, "followers", array($id_user));
            $followers = pg_fetch_assoc($followers)["count"];
            
            $r["followers"]=$followers;

            $following = pg_prepare($connection, "following", $queries["profilepage"]["following"]);
            $following = pg_execute($connection, "following", array($id_user));
            $following = pg_fetch_assoc($following)["count"];
            
            $r["following"]=$following;

            //fetch number of posts 
            $postscount = pg_prepare($connection, "postscount", $queries["profilepage"]["postscount"]);
            $postscount = pg_execute($connection, "postscount", array($id_user));
            $postscount = pg_fetch_assoc($postscount)["count"];
            
            $r["postscount"]=$postscount;

            // fetching if logged user follows searched user 
            $follow = pg_prepare($connection, "follow", "SELECT COUNT(*) FROM followers_list where followed_id_user = $1 and follower_id_user =$2");
            $follow = pg_execute($connection, "follow", array($id_user,$id_nav_user));
            $follow = pg_fetch_assoc($follow)["count"];

            $r["logged_following"]= ($follow==1) ? true:false;
            if($r){
                echo json_encode([
                    "status" => 200,
                    "data"=>$r,
                    "posts"=>$postArray,
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