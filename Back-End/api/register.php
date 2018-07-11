<?php
    // hashing => http://php.net/manual/es/function.password-hash.php
    // verify => http://php.net/manual/es/function.password-verify.php
    header('Access-Control-Allow-Origin: *');

    require_once("../requires/pgconnection.php");
    
    $body = file_get_contents('php://input');
    $bodydata = json_decode($body, true);
    $data = [
        "name" => $bodydata["name"],
        "username" => $bodydata["username"],
        "password" => password_hash($bodydata["password"], PASSWORD_DEFAULT),
        "email" => $bodydata["email"],
        "biography" => $bodydata["bio"]
    ];
    $connection = getConnection();
    try {
        if($connection) {
            $insert = pg_insert($connection, 'app_user', $data);
            if($insert){
                echo json_encode([
                    "status" => 200,
                    "res" => "Registration succesfull"
                ]);
            }
        }
    } catch (Exception $e){
        echo json_encode([
            "status" => 400,
            "res" => "Error -> " + $e->getMessage()
        ]);
    }

?>