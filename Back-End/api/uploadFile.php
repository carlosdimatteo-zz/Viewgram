<?php
    header('Access-Control-Allow-Origin: *');
    // variables to work
    require_once("../requires/pgconnection.php");
    $file = $_FILES["file"];
    $newpath = "C://xampp//htdocs//trippygram//avatars//";
    $newpath = $newpath . basename( $_FILES['file']['name']);
    $filetype = explode("/", $file["type"])[1]; // like split function in js
    $allowedtypes = ["jpeg", "jpg", "png", "mp4"];
    // end of variables to work
  
    $isallow = ((in_array($filetype, $allowedtypes)));
    
    if($isallow){
        if (move_uploaded_file($file['tmp_name'], $newpath)) {
            echo json_encode([
                "status" => 200,
                "msg" => "Everything went ok...",
                "path" => $newpath
            ]);        
        } else {
            echo json_encode([
              "status" => 400,
              "msg" => "Erro while uploading image...."
            ]);
        }
    } else {
        echo json_encode([
            "status" => 400,
            "msg" => "FILE NOT ALLOWED"
        ]);
    }       

?>