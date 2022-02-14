var slots = [0,0,0,0,0,0,0,0,0,0];
var isOk = 0;

function game(){
    slots = get_data();
    console.log(slots);
    for (var i = 0; i < 9; i++){
        x = i+1
        if(slots[i] == 0){
            document.getElementById("b" + x).disabled = false;
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

    if((ActualTurn == 1 && isOwner == 1) || (ActualTurn == 2 && isOwner == 0)){ 
        isOk = 1;
        console.log("Aguardando Jogada");
    } else {
        IntervalID = setInterval(waitForPlay, 3000);
    }
}

function btClick(x){
    if(isOk == 1){
        x = x-1;
        slots[x] = ActualTurn;
        send_data(slots, ActualTurn);
        isOk = 0;
        document.getElementById("p1_fundo").style.backgroundColor = "#222"; // Mudar a cor da esquerda (Jogador 1) para Cinza Escuro
        document.getElementById("p2_fundo").style.backgroundColor = "#222"; // Mudar a cor da direita (Jogador 2) para Cinza Escuro  
    }
}
