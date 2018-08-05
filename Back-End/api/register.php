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
        "name" => $bodydata["name"],
        "username" => $bodydata["username"],
        "password" => password_hash($bodydata["password"], PASSWORD_DEFAULT),
        "email" => $bodydata["email"],
        "biography" => $bodydata["bio"]
    ];
    $connection = getConnection();
    $q=getQueries();
    try {
        if($connection) {
            pg_query($connection, "DEALLOCATE ALL");

            //  register into database

            $register = pg_prepare($connection, "register", $q["register"]["registerquery"]);
            $register = pg_execute($connection, "register", array($data["name"],$data["username"],$data["password"],$data["email"],$data["biography"]));
            $result = pg_fetch_assoc($register);
            if($result["username"]){
                echo json_encode([
                    "status" => 200,
                    "res" => "Registration succesfull"
                ]);
            }else{
                echo json_encode([
                    "status" => 300,
                    "res" => "Registration unsuccesfull user already exists"
                ]);

            }
        }
    } catch (Exception $e){
        echo json_encode([
            "status" => 400,
            "message" => "Error -> " + $e->getMessage(),
            "res"=>"Registration unsuccesfull check your credentials"
        ]);
    }

?>