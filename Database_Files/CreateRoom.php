<?php
    require_once('database.php');
    $objDb = new db();
    $link = $objDb->conecta_mysql();
    $nick = $_POST['nick'];
    $id = rand(0,9999999);
    $query = "INSERT INTO tb_rooms(ID_Room, Player1, stats) VALUES ('$id','$nick','0')";
    mysqli_query($link, $query);
    $respota = array('id' => $id, 'nick' => $nick);
    echo json_encode($respota);
?>