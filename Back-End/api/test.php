<?php
    header('Access-Control-Allow-Origin: *');
    echo json_encode([
        "status" => 200,
        "msg" => "Request successfull!",
        "img" => "C://hybridgram_posts//37077073.png"
    ]);
?>