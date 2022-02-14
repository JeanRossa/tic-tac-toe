<?php
    require_once('database.php');
    $objDb = new db();
    $link = $objDb->conecta_mysql();
    $id = $_POST['id'];
    if($_POST['reset'] == 1){
        $win1 = $_POST['p1Wins'];
        $win2 = $_POST['p2Wins'];
        $query = "UPDATE tb_rooms SET slot1 = '0', slot2 = '0', slot3 = '0', slot4 = '0', slot5 = '0', slot6 = '0', slot7 = '0', slot8 = '0', slot9 = '0', p1_WinCounter = '$win1', p2_WinCounter = '$win2'  WHERE ID_Room = '$id'";
    } else {
        $s1 = $_POST['s1'];
        $s2 = $_POST['s2'];
        $s3 = $_POST['s3'];
        $s4 = $_POST['s4'];
        $s5 = $_POST['s5'];
        $s6 = $_POST['s6'];
        $s7 = $_POST['s7'];
        $s8 = $_POST['s8'];
        $s9 = $_POST['s9'];
        $turn = $_POST['turn'];
        if($turn == 1){ 
            $turn = 2;
        } else {
            $turn = 1;
        }
        $query = "UPDATE tb_rooms SET slot1 = '$s1', slot2 = '$s2', slot3 = '$s3', slot4 = '$s4', slot5 = '$s5', slot6 = '$s6', slot7 = '$s7', slot8 = '$s8', slot9 = '$s9', turn = '$turn' WHERE ID_Room = '$id'";
    }
    echo $query;
    mysqli_query($link, $query);
?>