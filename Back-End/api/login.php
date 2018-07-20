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
        "username" => $bodydata["username"],
        "password" => $bodydata["password"]
    ];

    $connection = getConnection();
    $q = getQueries();

    try {
        if($connection) {

            // cleaaning up
            pg_query($connection, "DEALLOCATE ALL");
            // fetching username and password from database  
            $results = pg_prepare($connection, "SelectUsername", $q["login"]["loginquery"]);
            $results = pg_execute($connection, "SelectUsername", array($data["username"]));
            $r = pg_fetch_assoc($results);
            // session data
            $name = $r["username"];
            $id   = $r["id_user"];
            // variable to validate password
            $pass = ((password_verify($data["password"], $r["password"])) ? true: false);
            if($results) {
                // if passwords match
                if($pass){
                    echo json_encode([
                        "status" => 200,
                        "username" => $name,
                        "user_id" => $id,
                        "res" => "user: ".$name." Login succesfull",
                    ]);
                } else {
                    echo json_encode([
                        "status" => 400,
                        "res" => "user: ".$name." Login unsuccesfull, password didnt match",
                    ]);
                }
            }
        } else {
            // if user does not exist
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