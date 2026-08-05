# PrevisaoIA

Aplicação web simples, feita para fins de estudo, que consulta a previsão do tempo de uma cidade e usa uma IA para sugerir que roupa vestir com base na temperatura e umidade do momento. Também é possível digitar a cidade por voz.

## Como funciona

O projeto é 100% front-end (HTML, CSS e JavaScript puro, sem frameworks nem build step) e roda direto no navegador:

1. **Busca da cidade**: o usuário digita o nome da cidade (ou fala, usando o microfone) e clica na lupa.
2. **API de clima — OpenWeatherMap**: o app faz uma requisição `fetch` para a [OpenWeatherMap API](https://openweathermap.org/), que retorna temperatura, umidade, ícone do clima e nome da cidade em formato JSON.
3. **Reconhecimento de voz — Web Speech API**: o botão do microfone usa `webkitSpeechRecognition`, nativo do navegador, para transcrever a fala em texto e preencher o campo de busca automaticamente.
4. **Sugestão com IA — Groq API**: com os dados de temperatura e umidade já na tela, o botão "Sugestão de Roupa" envia esses dados para a [Groq API](https://groq.com/) (compatível com o formato da API da OpenAI), usando o modelo `openai/gpt-oss-120b`, e exibe a resposta da IA na tela.

## Estrutura de arquivos

```
index.html      # estrutura da página
style.css       # estilos visuais
scripts.js      # lógica: busca de clima, voz e chamada à IA
img/            # ícones (lupa e microfone)
```

## Que problema esse layout/projeto resolve

- **Estudo de integração com APIs externas**: serve como exercício prático de `fetch`, `async/await` e tratamento de JSON, consumindo uma API REST (clima) e uma API de IA (chat completions).
- **Estudo de APIs nativas do navegador**: uso da Web Speech API para reconhecimento de voz sem bibliotecas externas.
- **Caso de uso real simplificado**: resolve a pergunta prática "que roupa eu visto hoje?", combinando dado objetivo (clima) com uma camada de IA que interpreta esse dado e devolve uma resposta em linguagem natural — um exemplo didático de como enriquecer uma API tradicional com IA generativa.
- **Layout mínimo e responsivo**: uma única caixa central com input, botões de ação (busca e voz) e uma área de resultado que é preenchida dinamicamente, mostrando na prática como manipular o DOM (`innerHTML`) a partir de dados assíncronos.

## Como usar

Basta abrir o [index.html](index.html) em um navegador (o reconhecimento de voz via `webkitSpeechRecognition` funciona apenas em navegadores baseados em Chromium, como Chrome e Edge).

## Video Apresentação

<video controls src="Vídeo sem título-04_08_2026, 22_07.mp4" title="Title"></video>