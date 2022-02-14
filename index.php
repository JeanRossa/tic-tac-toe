<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="style.css" rel="stylesheet" type="text/css">
    <title>Tic-Tac-Toe</title>
</head>

<body>
    <table class ="equalDivide" width="100%" height="100%" cellpadding="0" cellspacing="0">
        <tr>
            <Td style="background-color: #222;"> <!-- Bloco esquerdo -->
                <div class = "multiplayerDiv" style="margin: 0;">
                    <br><p class="p1" style="color: white;">Crie uma Sala</p><br>
                    <input id="input_nick" placeholder="Insira seu Nick" class="nickInput"/>
                    <button class = "MultiplayerButtons" id = "btn_create"> <b>Criar Sala</b> </button>
                </div>
                <div class = "multiplayerDiv" style="margin: 50 0;">
                    <br><p class="p1" style="color: white;">Entre em uma Sala</p><br>
                    <input id="input_nick2" placeholder="Insira seu Nick" class="nickInput"/>
                    <input id="input_id" placeholder="Insira o ID da sala" class="nickInput"/>
                    <button class = "MultiplayerButtons" id="btn_enter"> <b>Entrar</b> </button>
                </div>
            </td>

            <td> <!-- Bloco Central -->
                <table width="100%" height="100%" cellpadding="0" cellspacing="0">
                    <tr><td height = "25%" style="background-color: rgb(18, 18, 18); box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);" id = "p1_fundo"> <!-- Bloco Superior -->
                        <div style="background-color: rgba(23,23,23,0.8); box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);" >
                            <br> <p class="p1">&#10060</p> <br>
                            <p class="p1" id = "P1_Nick">Esperando Jogador</p> <br>
                            <p class="p1" id = "P1_Wins"> ---- </p> <br>
                        </div>
                        <br>              
                    </td></tr>

                    <tr><Td height = "50%" style="background-color: rgb(20, 20, 20); box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);"> <!-- Bloco Central -->
                        <div class="centered" id = "div_game">
                            <table>
                                <tr>
                                    <td><button onclick="btClick(1)", class="button", id="b1"><p id="bt_txt1", class="textButtons"> </p></button></td>
                                    <td><button onclick="btClick(2)", class="button", id="b2"><p id="bt_txt2", class="textButtons"> </p></button></td>
                                    <td><button onclick="btClick(3)", class="button", id="b3"><p id="bt_txt3", class="textButtons"> </p></button></td>
                                </tr>
                                <tr>
                                    <td><button onclick="btClick(4)", class="button", id="b4"><p id="bt_txt4", class="textButtons"> </p></button></td>
                                    <td><button onclick="btClick(5)", class="button", id="b5"><p id="bt_txt5", class="textButtons"> </p></button></td>
                                    <td><button onclick="btClick(6)", class="button", id="b6"><p id="bt_txt6", class="textButtons"> </p></button></td>
                                </tr>
                                <tr>
                                    <td><button onclick="btClick(7)", class="button", id="b7"><p id="bt_txt7", class="textButtons"> </p></button></td>
                                    <td><button onclick="btClick(8)", class="button", id="b8"><p id="bt_txt8", class="textButtons"> </p></button></td>
                                    <td><button onclick="btClick(9)", class="button", id="b9"><p id="bt_txt9", class="textButtons"> </p></button></td>
                                </tr>
                            </table>
                        </div>
                    </td></tr>

                    <tr><td height = "25%" style="background-color: rgb(18, 18, 18); box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);" id = "p2_fundo"> <!-- Bloco Inferior -->
                        <div style="background-color: rgba(23,23,23,0.8); box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);">
                            <br> <p class="p1">&#11093</p> <br>
                            <p class="p1" id = "P2_Nick">Esperando Jogador</p> <br>
                            <p class="p1" id = "P2_Wins"> ---- </p> <br>
                        </div>
                    </td></tr>
                </table>           
            </td>

            <Td style="background-color: #222;"> <!-- Bloco Direito -->
                <div class = "multiplayerDiv" style="margin: 0;">
                    <br><p class="p1" style="color: white;" id = "room_id">Sala ID: 00000</p><br>
                    <p class = "p1" id = room_player1> Jogador 1: xxxxxxx </p> <br>
                    <p class = "p1" id = room_player2> Jogador 2: Esperando jogador </p> <br>
                    <button class = "MultiplayerButtons" id = room_exit> <b>Sair da Sala</b> </button>
                </div>
            </Td>
        </tr>
    </table>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="Database_Files/getData.js"></script>
</body>