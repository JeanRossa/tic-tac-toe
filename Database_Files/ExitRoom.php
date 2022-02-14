<?php
    require_once('database.php');
    $objDb = new db();
    $link = $objDb->conecta_mysql();
    $id = $_POST['id'];
    $owner = $_POST['owner'];
    if($owner == 0){
        $query = "UPDATE tb_rooms SET Player2 = '', stats = '0' WHERE ID_Room = '$id'";
    } else {
        $query = "DELETE FROM tb_rooms WHERE ID_Room = '$id'";
        echo $query;
    }
    echo mysqli_query($link, $query);
?>