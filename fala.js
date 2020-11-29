//#region VARIAVEIS DE CONTROLE DE VOZ

var msg = new SpeechSynthesisUtterance();
voices = window.speechSynthesis.getVoices();
// msg.voiceURI = "Google português do Brasil"; 
msg.lang = "pt-BR";
msg.localService = true;
msg.voice = voices[15];
const recognition = new webkitSpeechRecognition();

recognition.interimResults = true;
recognition.lang = "pt-br";
recognition.continuous = true;
recognition.start();
//#endregion

// BOTÕES DE CONTROLE
const startLeitura = document.getElementById('startin');
const startEscreve = document.getElementById('startout');
const startFala = document.getElementById('start');
const textout = document.getElementById('textOutput');

// SETANDO ICONE
//document.getElementById("icone").href = window.location.href + "images/lapis.png";

//  - INICIA A AUDIÇÃO DO MICROFONE
function start(value) {
    progress(true);
    recognition.onresult = function(event) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                progress(false);
                let textoAjax = event.results[i][0].transcript.trim();
                if(value){
                    textout.innerHTML = textoAjax;
                    // ==== Ajax Para minha maquina ===
                    $.ajax(
                        method = "post",
                        url = "https://3911337d7e9d.ngrok.io/captar/index.php",
                        data = {
                            texto: textoAjax
                        }
                    );
                    return;
                }else{
                    speak(event.results[i][0].transcript.trim());
                    // ==== Ajax Para minha maquina ===
                    $.ajax(
                        method = "post",
                        url = "https://3911337d7e9d.ngrok.io/captar/index.php",
                        data = {
                            texto: textoAjax
                        }
                    );
                    return;
                }
                
            }
        }
    };
};
//  - FALA O TEXTO E NOTIFICA
function speak(text) {
    if(text == ""){
        document.getElementById("status").style = "color: rgb(154, 50, 50);";
        document.getElementById("status").value = "Preêncha o campo de texto acima!";
    }else{
        document.getElementById("status").style = "color: rgb(50, 200, 50);";
        document.getElementById("status").value = "Falando...";
    }
    msg.text = text;
    speechSynthesis.speak(msg);

    setTimeout(() =>{
        document.getElementById("status").style = "color: rgba(77, 76, 76, 0.835);";
        document.getElementById("status").value = "Status:";
    }, 2500);
}
//  - NOTIFICA QUE ESTA ESCUTANDO
function progress(response){
    if(response){
        document.getElementById("startin").style = "background: url('images/microfone1.png');"+
        "background-size: 100%;background-position: 100%;";
        document.getElementById("status").value = "Escutando...";
    }else{
        document.getElementById("startin").style = "background: url('images/microfone.png');"+
        "background-size: 100%;background-position: 100%;";
        document.getElementById("status").value = "Status:";
    }
}

startLeitura.addEventListener('click', () => {
    start(false);
});
startEscreve.addEventListener('click', () => {
    start(true);
});

startFala.addEventListener('click', () => speak(
    document.getElementById("textInput").value
));


      // function loadVoices() {

	// var voices = speechSynthesis.getVoices();
  
	// voices.forEach(function(voice, i) {
    //     var option = document.createElement('option');
        
	// 	option.value = voice.name;
    //     option.innerHTML = voice.name;
        
	// 	selection.appendChild(option);
	// });
    //}

// Execute loadVoices.
//loadVoices();