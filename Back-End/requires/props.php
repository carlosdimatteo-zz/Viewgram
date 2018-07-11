<?php

    // http://php.net/manual/es/function.pg-prepare.php
    function getQueries(){
    $queries = [
        "login" => [
            "loginquery" => "SELECT * FROM app_user WHERE username = $1",
        ],
        "homepage" => [
            "followerspost" => "SELECT * FROM post_1 a INNER JOIN followers_list b ON a.id_user = b.followed_id_user WHERE b.follower_id_user = $1",
            "selecteduser" => "SELECT * FROM app_user WHERE id_user = $1"
        ],
        "profilepage" => [
            "data" => "SELECT * FROM app_user WHERE id_user = $1",
            "posts" => "SELECT * FROM post_1 WHERE id_user = $1",
            "postscount" => "SELECT COUNT (*) FROM post_1 WHERE id_user = $1",
            "likes" => "SELECT * FROM likes a INNER JOIN post b ON a.post_id = b.post_id WHERE a.id_user = $1",
            "followers" => "SELECT COUNT (*) FROM app_user a INNER JOIN followers_list b ON a.id_user = b.follower_id_user WHERE b.followed_id_user = $1",
            "following" => "SELECT COUNT (*) FROM app_user a INNER JOIN followers_list b ON a.id_user = b.followed_id_user WHERE b.follower_id_user = $1"
        ],
        "searchpage" => [
            "user" => "SELECT * FROM app_user WHERE username = $1",
            "tag_id"=> "SELECT hashtag_id FROM hashtag WHERE hashtag = $1",
            "tag" => "SELECT p.post_id,p.post_caption,p.id_user,p.created_at FROM post_1 p INNER JOIN post_hashtag h ON p.post_id = h.post_id WHERE h.hashtag_id = $1 ORDER BY p.created_at DESC",
        ],
        "postpage" => [
            "data"=>"SELECT a.avatar,a.username,p.* FROM post_1 p INNER JOIN app_user a ON p.id_user = a.id_user WHERE post_id = $1",
            "getlikes" => "SELECT COUNT(*) FROM likes WHERE post_id = $1",
            "user_liked"=> "SELECT * FROM likes WHERE post_id =$1 AND id_user = $2",
            "getcomments" => "SELECT a.username,c.* FROM comments c INNER JOIN app_user a ON c.id_user=a.id_user WHERE post_id = $1"
            
        ],
        "interaction" => [
            "deletecomment" => "DELETE FROM commets WHERE id_user= $1 AND post_id = $2",
            "dislike" => "DELETE FROM likes WHERE id_user= $1 AND post_id = $2",
            "report" => "UPDATE post_1 SET report_count = report_count + 1 WHERE post_id = $1",
            "comment"=> "INSERT INTO comments (post_id,id_user,created_at,comment_text) VALUES ($1,$2,$3,$4)",
            "like"=> "INSERT INTO likes VALUES ($1,$2)"
        ]
    ];
    return $queries;
}

    //echo json_encode($queries);
?>