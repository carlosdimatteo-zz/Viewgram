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
