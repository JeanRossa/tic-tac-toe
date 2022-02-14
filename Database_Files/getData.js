var id_sala_atual;
var nick_atual;
var isOwner;
var IntervalID;
var ActualTurn;
var isOk;
var slots = [0,0,0,0,0,0,0,0,0];
var p1Wins = 0;
var p2Wins = 0;
update_stats(0);

$(document).ready(function () {
    $('#room_exit').prop("disabled", true);
})

$("#btn_create").click((e)=>{
    e.preventDefault();
    console.log("Botão clicado! Salvando dados na database");

    var dados = new FormData();
    dados.append("nick", $("#input_nick").val());

    $.ajax({
        url: 'Database_Files/CreateRoom.php',
        method: 'post',
        data: dados,
        processData: false,
        contentType: false,
    }).done(function(x){
        console.log(x);
        const resposta = JSON.parse(x);
        id_sala_atual = resposta.id;
        nick_atual = resposta.nick;
        $('#room_id').last().html("Sala ID: " + resposta.id);
        $('#room_player1').last().html("Jogador 1: " + resposta.nick);
        $('#P1_Nick').last().html(resposta.nick);
        update_stats(1);
        isOwner = 1;
    })
    console.log("Dados Salvos!");
    intervalID = setInterval(check, 3000);
})

function check() {
    console.log("Conferindo se existe algum jogador!");
    var dados = new FormData();
    dados.append("id", id_sala_atual);
    dados.append("nick", nick_atual);
    
    $.ajax({
        url: 'Database_Files/CheckRoom.php',
        method: 'post',
        data: dados,
        processData: false,
        contentType: false,
    }).done(function(x){
        const resposta = JSON.parse(x);
        console.log(resposta);
        if(resposta.status == 1) {
            clearInterval(intervalID); 
            $('#room_player2').last().html("Jogador 2: " + resposta.nick2);
            $('#P2_Nick').last().html(resposta.nick2);
            update_stats(2);
        } else{
            $('#room_player2').last().html("Jogador 2: Esperando Jogador");
        }
    })
}

$("#btn_enter").click((e)=>{
    e.preventDefault();
    console.log("Botão clicado! Salvando dados na DB");
    var dados = new FormData();
    dados.append("id", $("#input_id").val());
    dados.append("nick", $("#input_nick2").val());

    $.ajax({
        url: 'Database_Files/EnterRoom.php',
        method: 'post',
        data: dados,
        processData: false,
        contentType: false,
    }).done(function(x){
        const resposta = JSON.parse(x);
        id_sala_atual = resposta.id_sala;
        nick_atual = resposta.nick2;    
        if(resposta.status == 1){
            $('#room_id').last().html("Sala ID: " + resposta.id_sala);
            $('#room_player1').last().html("Jogador 1: " + resposta.nick1);
            $('#room_player2').last().html("Jogador 2: " + resposta.nick2);
            $('#P1_Nick').last().html(resposta.nick1);
            $('#P2_Nick').last().html(resposta.nick2);
            update_stats(1);
            update_stats(2);
            isOwner = 0;
        } else {
            $('#room_id').last().html("Ocorreu um erro");
        }
    })
})

$("#room_exit").click((e)=>{
    e.preventDefault();
    var dados = new FormData();
    dados.append("id", id_sala_atual);
    dados.append("owner", isOwner);

    $.ajax({
        url: 'Database_Files/ExitRoom.php',
        method: 'post',
        data: dados,
        processData: false,
        contentType: false,
    }).done(function(x){
        console.log(x);
        isOwner = 0;   
        update_stats(0);
    })
})  

function update_stats(x){
    if(x == 0){
        $('#btn_create').prop("disabled", false);
        $('#btn_enter').prop("disabled", false);
        $('#room_exit').prop("disabled", true);  
        $('#room_id').last().html("Sala ID: 000000");
        $('#room_player1').last().html("");
        $('#room_player2').last().html("");  
        $('#P1_Nick').last().html("Esperando Jogador");
        $('#P2_Nick').last().html("Esperando Jogador");
        $('#div_game').fadeOut();
    }
    if(x == 1){
        $('#btn_create').prop("disabled", true);
        $('#btn_enter').prop("disabled", true);
        $('#room_exit').prop("disabled", false);     
    }
    if(x == 2){
        get_data();
        $('#div_game').fadeIn();
        $('#P1_Wins').last().html("Vitórias: 0");
        $('#P2_Wins').last().html("Vitórias: 0");
    }
}

function get_data(){
    console.log("Pegando os dados da sala");
    var dados = new FormData();
    dados.append("id", id_sala_atual); 
    $.ajax({
        url: 'Database_Files/CheckRoom.php',
        method: 'post',
        data: dados,
        processData: false,
        contentType: false,
    }).done(function(x){
        const data = JSON.parse(x);  
        p1Wins = data.p1_winCounter;
        $('#P1_Wins').last().html("Vitórias: " + p1Wins);   
        p2Wins = data.p2_winCounter;
        $('#P2_Wins').last().html("Vitórias: " + p2Wins);
        slots = [data.s1, data.s2, data.s3, data.s4, data.s5, data.s6, data.s7, data.s8, data.s9]; 
        ActualTurn = data.turno;
        for (var i = 0; i < 9; i++){
            x = i+1
            if(slots[i] == 0){
                document.getElementById("b" + x).disabled = false;
                document.getElementById("b" + x).style.removeProperty("background"); // Remove a propriedade da mudança de cor, assim mantendo o aspecto original do botão
                document.getElementById("bt_txt" + x).innerHTML = " "; // Remove os caracteres inseridos nos botões
            } else {
                document.getElementById("b" + x).disabled = true;
                if(slots[i] == 1){
                    document.getElementById("bt_txt" + x).innerHTML = "&#10060"; // Inserir no <p> do botão
                    document.getElementById("b" + x).style.background='#014513'; // Mudar a cor do fundo do botão          
                } else {
                    document.getElementById("bt_txt" + x).innerHTML = "&#11093"; // Inserir no <p> do botão
                    document.getElementById("b" + x).style.background='#013345'; // Mudar a cor do fundo do botão               
                }
            }
        }
        if(ActualTurn == 1){
            document.getElementById("p1_fundo").style.backgroundColor = "#014513"; // Mudar a cor da esquerda (Jogador 1) para Verde 
            document.getElementById("p2_fundo").style.backgroundColor = "#222"; // Mudar a cor da direita (Jogador 2) para Cinza Escuro       
        } else {
            document.getElementById("p1_fundo").style.backgroundColor = "#222"; // Mudar a cor da esquerda (Jogador 1) para Cinza Escuro
            document.getElementById("p2_fundo").style.backgroundColor = "#013345"; // Mudar a cor da direita (Jogador 2) para Azul       
        }
        var y = checkGame(slots);
        console.log(y);
        if(y == 1){
            p1Wins++;
            document.getElementById('P1_Wins').classList.add("anim"); // Acionar animação para o texto de "Vitórias" do Jogador 1
            $('#P1_Wins').last().html("Vitórias: " + p1Wins);          
            console.log("Vitoria Player1 " + p1Wins);
        }
        else if (y == 2){
            p2Wins++;
            document.getElementById('P2_Wins').classList.add("anim"); // Acionar animação para o texto de "Vitórias" do Jogador 2
            $('#P2_Wins').last().html("Vitórias: " + p2Wins);
            console.log("Vitoria Player2 " + p2Wins);     
        }
        if (y != 0){ // Caso o jogo tenha tido algum desfecho (Vitória ou empate)
            setTimeout(clearClass, 2000); // Após dois segundos a função "clearClass" é chamada com o objetivo de eliminar a classe "anim" dos textos de vítoria
            resetGame();
        }
        else if((ActualTurn == 1 && isOwner == 1) || (ActualTurn == 2 && isOwner == 0)){ 
            isOk = 1;
            console.log("Aguardando Jogada");
        } else {
            IntervalID = setInterval(waitForPlay, 3000);
        }             
    })   
}

function resetGame(){
    var dados = new FormData();
    dados.append("id", id_sala_atual);
    dados.append("reset", 1);
    console.log(p1Wins);
    dados.append("p1Wins", p1Wins);
    dados.append("p2Wins", p2Wins);
    $.ajax({
        url: 'Database_Files/ChangeData.php',
        method: 'post',
        data: dados,
        processData: false,
        contentType: false,
    }).done(function(x){
        console.log(x);
        get_data();
    })    
}

function checkGame(gS){
    if((gS[0] == 1 && gS[1] == 1 && gS[2] == 1) || (gS[3] == 1 && gS[4] == 1 && gS[5] == 1) || (gS[6] == 1 && gS[7] == 1 && gS[8] == 1)){ // Possibilidades na horizontal
        return 1; // Vitória P1
    }
    else if((gS[0] == 1 && gS[3] == 1 && gS[6] == 1) || (gS[1] == 1 && gS[4] == 1 && gS[7] == 1) || (gS[2] == 1 && gS[5] == 1 && gS[8] == 1)){ // Possibilidades na vertical
        return 1; // Vitória P1
    }
    else if((gS[0] == 1 && gS[4] == 1 && gS[8] == 1) || (gS[6] == 1 && gS[4] == 1 && gS[2] == 1)){ // Possibilidades na diagonal 
        return 1; // Vitória P1
    }
    else if((gS[0] == 2 && gS[1] == 2 && gS[2] == 2) || (gS[3] == 2 && gS[4] == 2 && gS[5] == 2) || (gS[6] == 2 && gS[7] == 2 && gS[8] == 2)){ // Possibilidades na horizontal
        return 2; // Vitória P2
    }
    else if((gS[0] == 2 && gS[3] == 2 && gS[6] == 2) || (gS[1] == 2 && gS[4] == 2 && gS[7] == 2) || (gS[2] == 2 && gS[5] == 2 && gS[8] == 2)){ // Possibilidades na vertical
        return 2; // Vitória P2
    }
    else if((gS[0] == 2 && gS[4] == 2 && gS[8] == 2) || (gS[6] == 2 && gS[4] == 2 && gS[2] == 2)){ // Possibilidades na diagonal
        return 2; // Vitória P2
    }
    else{
        for (var i = 0; i < gS.length; i++){
            if(gS[i] == 0){
                return 0
            }
        }
        return 3; // Empate
    }
}

function btClick(x){
    if(isOk == 1){
        x = x-1;
        slots[x] = ActualTurn;
        send_data();
        isOk = 0;
        document.getElementById("p1_fundo").style.backgroundColor = "#222"; // Mudar a cor da esquerda (Jogador 1) para Cinza Escuro
        document.getElementById("p2_fundo").style.backgroundColor = "#222"; // Mudar a cor da direita (Jogador 2) para Cinza Escuro  
    }
}

function waitForPlay(){
    console.log("Pegando os dados da sala");
    var dados = new FormData();
    dados.append("id", id_sala_atual); 
    $.ajax({
        url: 'Database_Files/CheckRoom.php',
        method: 'post',
        data: dados,
        processData: false,
        contentType: false,
    }).done(function(x){
        const data = JSON.parse(x);
        if(ActualTurn != data.turno){
            clearInterval(IntervalID);
            get_data();
        }
    })   
}

function send_data(){
    var dados = new FormData();
    dados.append("id", id_sala_atual);
    dados.append("s1", slots[0]);
    dados.append("s2", slots[1]);
    dados.append("s3", slots[2]);
    dados.append("s4", slots[3]);
    dados.append("s5", slots[4]);
    dados.append("s6", slots[5]);
    dados.append("s7", slots[6]);
    dados.append("s8", slots[7]);
    dados.append("s9", slots[8]);
    dados.append("turn", ActualTurn);
    dados.append("reset", 0);
    $.ajax({
        url: 'Database_Files/ChangeData.php',
        method: 'post',
        data: dados,
        processData: false,
        contentType: false,
    }).done(function(x){
        get_data();
    })
}

function clearClass(){
    document.getElementById("P1_Wins").classList.remove("anim") 
    document.getElementById("P2_Wins").classList.remove("anim")
}