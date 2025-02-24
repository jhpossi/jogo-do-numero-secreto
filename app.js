let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

};

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do números secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 10');
};

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavrasTentativa = tentativas > 1 ? `tentativas`: `tentativa`;
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavrasTentativa}!`;
        exibirTextoNaTela('p',mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor.');
        }else{
            exibirTextoNaTela('p','O número secreto é maior.');
        }        
        tentativas++;             
        limparCampo();
    }
};

function gerarNumeroAleatorio(){
    let numerosEscolhido =  parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeEmelementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeEmelementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numerosEscolhido)){
        return gerarNumeroAleatorio();
    }
    else{
        listaDeNumerosSorteados.push(numerosEscolhido);
        return numerosEscolhido;
    }
};

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas  = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}