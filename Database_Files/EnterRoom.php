<?php
    require_once('database.php');
    $objDb = new db();
    $link = $objDb->conecta_mysql();
    $nick = $_POST['nick'];
    $id = $_POST['id'];
    $query = "UPDATE tb_rooms SET Player2 = '$nick', stats = '1' WHERE ID_Room = '$id' and stats = '0'";
    mysqli_query($link, $query);
    $resposta = array('status' => 0,
                      'id_geral' => 0,
                      'id_sala' => 0,
                      'nick1' => 0,
                      'nick2' => 0,
                      'estado' => 0);
    if(mysqli_affected_rows($link) == 1){
        $query = "SELECT * FROM tb_rooms WHERE ID_Room = '$id' AND stats = '1'";
        $check_estado = mysqli_fetch_array(mysqli_query($link, $query));    
        if($check_estado != NULL){
            $resposta['status'] = 1;
            $resposta['id_geral'] = $check_estado[0];
            $resposta['id_sala'] = $check_estado[1];
            $resposta['nick1'] = $check_estado[2];
            $resposta['nick2'] = $check_estado[3];
            $resposta['estado'] = $check_estado[4];         
        }
    }
    echo json_encode($resposta);
?>