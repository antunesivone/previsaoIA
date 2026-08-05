/*Lógica de Programação passo-a-passo
Requisitos:

Fluxo Básico
[x] Descobrir quando o batão foi clicado
[x]Pegar o nome da Cidade no input
[x]Enviar a Cidade para o servidor
[x]Pegar a resposta e por na tela

Fluxo de voz
[x]Quando o botão foi clicado
[x]Começar a ouvir e pegar a transcrição do audio 
[]Enviar a transcrição para o servidor
[]Pegar a resposta e por na tela

Fluxo da IA
[x]Pegar os dados da Cidade
[x]Enviar os dados para IA
[x]Colocar os dados na tela
[]subir para o servidor

Document = html
querySelector = seleciona, pega algo no html

https://home.openweathermap.org/
*/


let chaveIa = CONFIG.chaveIa

async function cliqueiNoBotao() {
    // Adicione o "document." antes do querySelector
    let cidade = document.querySelector(".input-cidade").value
    let caixa = document.querySelector(".caixa-media")


    let chave = CONFIG.chaveClima


// Para usar variáveis dentro de uma string (${cidade}), você deve usar crases ( ` ) 
//configurar em grau celsius conforme a documentacao, acrescentar depois da chave com o &  
    let endereco = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`

//Precisa avisar o JavaScript que irá até o servidor
//Precisa traduzir a resposta do servidor/ JSON
//javascript objecto notation é o JSON /formato que o Javascript entende 
//fetch permite sair do código para ir até o servidor buscar a informação, pode levar um tempo, não sabemos...
//async + await "promessa", await serve para avisar o Javascript que deve esperar o retorno do fetch que foi no servidor, a funcao tmb deve ser avisada com o async o que vai acontecer no código.
//https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}.png 

    let respostaServidor = await fetch (endereco)
    let dadosJson = await respostaServidor.json()

       // TRATAMENTO DE ERRO: Verifica se a cidade não foi encontrada
    if (dadosJson.cod === "404") {
        caixa.innerHTML = `
        <h2 class="cidade">Cidade não encontrada</h2>
        <p class="temp">Nome errado, tente novamente!</p>`
        return // Para a execução da função aqui
    }
    
        caixa.innerHTML = `
    <h2 class="cidade">${dadosJson.name}</h2>
    <p class="temp">${Math.floor(dadosJson.main.temp)} ℃</p> 
    <img class="icone" src="https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}.png"> 
    <p class="umidade">Umidade: ${dadosJson.main.humidity}%</p>
    <button class="botao-ia" onclick="pedirSugestaoRoupa()">Sugestão de Roupa</button>
    <p class="resposta-ia">Resposta da IA aparecerá aqui</p>`

}

function detectaVoz(){
    //window é a janela que vai atá o navegador, new é o comando para pegar webkitSpeeckRecognition 
    let reconhecimento = new window.webkitSpeechRecognition()    
    //configuraçoes
    reconhecimento.lang ="pt-BR"
    reconhecimento.start()

    reconhecimento.onresult = function (evento) {
        let textoTranscrito = evento.results[0][0].transcript
        document.querySelector(".input-cidade").value = textoTranscrito
        cliqueiNoBotao()
    }}


  // ("https://api.groq.com/openai/v1/chat/completions"
  //https://api.groq.com/openai/v1/chat/completions

async function pedirSugestaoRoupa() {
    let temperatura = document.querySelector(".temp").textContent;
    let umidade = document.querySelector(".umidade").textContent;
    let cidade = document.querySelector(".cidade").textContent;
    let campoResposta = document.querySelector(".resposta-ia");

    try {
        // 1. FAZER A REQUISIÇÃO (Isso define a variável 'resposta')
        let resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + chaveIa 
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-120b", // Modelo padrão da Groq
                messages: [{ 
                    "role": "user",
                    "content": `Olá, estou em ${cidade}, faz ${temperatura} e a umidade é ${umidade}. Que roupa devo usar? Responda curto.`
                }]
            })
        });

        // 2. CONVERTER PARA JSON
        let dados = await resposta.json();

        // 3. ACESSAR O CAMINHO CORRETO E EXIBIR
        campoResposta.innerText = dados.choices[0].message.content;
        
        //console.log("Sucesso:", dados);

    } catch (erro) {
        // 4. TRATAR O ERRO
        campoResposta.innerText = "Erro";
       // console.error("Erro técnico:", erro);
    }
}



    

/* Metodos HTTP
-Padrão: pegar dados do servidor
-Post: enviar dados servidor/receber resposta
-Put:atualizar dados no servidor
-delete: deletar dados do servidor
*/

