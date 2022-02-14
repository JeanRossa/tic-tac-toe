<?php
    require_once('database.php');
    $objDb = new db();
    $link = $objDb->conecta_mysql();
    $id = $_POST['id'];
    $query = "SELECT * FROM tb_rooms WHERE ID_Room = '$id' AND stats = '1'";
    $dados = array('status' => 0,
                      'id_geral' => 0,
                      'id_sala' => 0,
                      'nick1' => 0,
                      'nick2' => 0,
                      'estado' => 0,
                      'createdAt' => 0,
                      's1' => 0,
                      's2' => 0,
                      's3' => 0,
                      's4' => 0,
                      's5' => 0,
                      's6' => 0,
                      's7' => 0,
                      's8' => 0,
                      's9' => 0,
                      'turno' => 0,
                      'p1_winCounter' => 0,
                      'p2_winCounter' => 0);
    $check_estado = mysqli_fetch_array(mysqli_query($link, $query));    
    if($check_estado != NULL){
        if($check_estado[1] == $id){
            $dados['status'] = 1;
            $dados['id_geral'] = $check_estado[0];
            $dados['id_sala'] = $check_estado[1];
            $dados['nick1'] = $check_estado[2];
            $dados['nick2'] = $check_estado[3];
            $dados['estado'] = $check_estado[4];
            $dados['createdAt'] = $check_estado[5];
            $dados['s1'] = $check_estado[6];
            $dados['s2'] = $check_estado[7];
            $dados['s3'] = $check_estado[8];
            $dados['s4'] = $check_estado[9];
            $dados['s5'] = $check_estado[10];
            $dados['s6'] = $check_estado[11];
            $dados['s7'] = $check_estado[12];
            $dados['s8'] = $check_estado[13];
            $dados['s9'] = $check_estado[14];
            $dados['turno'] = $check_estado[15];
            $dados['p1_winCounter'] = $check_estado[16];
            $dados['p2_winCounter'] = $check_estado[17];
        }
    }
    echo json_encode($dados);
?>