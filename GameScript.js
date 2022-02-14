var p1Wins = 0; // Controle de vitórias Jogador 1
var p2Wins = 0; // Controle de vitórias Jogador 2
var gS = [0,0,0,0,0,0,0,0,0] // Variaveis de controle de jogo
var turno = 0; // Controle do turno

function btClick(x){
    document.getElementById("b" + x).disabled = true; // Desabilitar o botão clicado
    if(turno == 0){
        document.getElementById("bt_txt" + x).innerHTML = "&#10060"; // Inserir no <p> do botão
        document.getElementById("b" + x).style.background='#014513'; // Mudar a cor do fundo do botão
        document.getElementById("p1_fundo").style.backgroundColor = "#222"; // Mudar a cor da esquerda (Jogador 1) para Cinza Escuro
        document.getElementById("p2_fundo").style.backgroundColor = "#013345"; // Mudar a cor da direita (Jogador 2) para Azul
        gS[x - 1] = 1;
        turno++;
    }
    else{
        document.getElementById("bt_txt" + x).innerHTML = "&#11093"; // Inserir no <p> do botão
        document.getElementById("b" + x).style.background='#013345'; // Mudar a cor do fundo do botão
        document.getElementById("p1_fundo").style.backgroundColor = "#014513"; // Mudar a cor da esquerda (Jogador 1) para Verde 
        document.getElementById("p2_fundo").style.backgroundColor = "#222"; // Mudar a cor da direita (Jogador 2) para Cinza Escuro
        gS[x - 1] = 2;
        turno--;
    }
    
    if(checkGame() == 1){ // Se o Jogador 1 VENCER
        p1Wins++;
        document.getElementById('P1_Wins').classList.add("anim"); // Acionar animação para o texto de "Vitórias" do Jogador 1
        document.getElementById("P1_Wins").innerHTML = "Vitórias: " + p1Wins; // Mudar o texto para contabilizar a vitória
    }
    else if(checkGame() == 2){ // Se o Jogador 2 VENCER
        p2Wins++;
        document.getElementById('P2_Wins').classList.add("anim"); // Acionar animação para o texto de "Vitórias" do Jogador 2
        document.getElementById("P2_Wins").innerHTML = "Vitórias: " + p2Wins; // Mudar o texto para contabilizar a vitória
    }
    if (checkGame() != 0){ // Caso o jogo tenha tido algum desfecho (Vitória ou empate)
        setTimeout(clearClass, 2000); // Após dois segundos a função "clearClass" é chamada com o objetivo de eliminar a classe "anim" dos textos de vítoria
        for (var i = 0; i < gS.length; i++){
            var ctrlReset = i + 1; // Variavel de controle para conseguir puxar o o id dos elementos (Por algum motivo só deixar o um "i+1" no lugar dessa gambiarra não funcionou)
            document.getElementById("b" + ctrlReset).style.removeProperty("background"); // Remove a propriedade da mudança de cor, assim mantendo o aspecto original do botão
            document.getElementById("b" + ctrlReset).disabled = false; // Habilita novamente os botões usados
            document.getElementById("bt_txt" + ctrlReset).innerHTML = " "; // Remove os caracteres inseridos nos botões
            gS[i] = 0; // Reseta o jogo para o zero
        }
    }
}

function checkGame(){
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

function clearClass(){
    document.getElementById("P1_Wins").classList.remove("anim") 
    document.getElementById("P2_Wins").classList.remove("anim")
}
