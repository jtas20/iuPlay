showLoading();

//MUSICAS
let musicas = [
    {img:'imagens/folder_1.jpg', titulo:'I Mean It (feat. Remo)', artista:'G-Eazy', src:'https://dbiuplay.netlify.app/musicas/G-Eazy - I Mean It (feat. Remo).mp3'},
    {img:'imagens/folder_2.jpg', titulo:'Lonely world', artista:'Brennan Savage', src:'https://dbiuplay.netlify.app/musicas/Brennan%20Savage%20-%20Lonely%20World.mp3'},
    {img:'imagens/folder_3.jpg', titulo:'Laugh, I Nearly Died', artista:'The Rolling Stones', src:'https://dbiuplay.netlify.app/musicas/The%20Rolling%20Stones%20-%20Laugh,%20I%20Nearly%20Died.mp3'},
    {img:'imagens/folder_4.jpg', titulo:'Nightcall', artista:'Kavinsky', src:'https://dbiuplay.netlify.app/musicas/Kavinsky - Nightcall.mp3'},
    {img:'imagens/folder_5.jpg', titulo:'Look At Me Now', artista:'Brennan Savage', src:'https://dbiuplay.netlify.app/musicas/Brennan%20Savage%20-%20Look%20at%20Me%20Now.mp3'},
    {img:'imagens/folder_6.jpg', titulo:'All Right Now', artista:'Free', src:'https://dbiuplay.netlify.app/musicas/Free - All Right Now.mp3'},
    {img:'imagens/folder_7.jpg', titulo:'Bank Account', artista:'21 Savage', src:'https://dbiuplay.netlify.app/musicas/21 Savage - Bank Account.mp3'}
];

//DECLARAÇÕES
let musica = document.querySelector('audio');
let indexMusica = 0;

let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

//COLOCAR INFORMAÇÕES DA MUSICA ATUAL
//OU SEJA REDERIZAR
renderizarMusica(indexMusica);

//EVENTOS
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;

    if(indexMusica < 0){
        indexMusica = 6;
    }

    renderizarMusica(indexMusica);
    tocarMusica();
});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;

    if(indexMusica > 6){
        indexMusica = 0;
    }

    renderizarMusica(indexMusica);
    tocarMusica();
});

//FUNÇÕES
function renderizarMusica(index){
    showLoading();
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        imagem.src = musicas[index].img;
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        duracao();
        hideLoading();

        if(indexMusica > 0){
            tocarMusica();
        }

    });
}

function tocarMusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinuto(Math.floor(musica.currentTime));

    if(musica.currentTime === musica.duration){
        indexMusica++;
        renderizarMusica(indexMusica);
    }
}

function segundosParaMinuto(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;

    if(campoSegundos < 10){
        campoSegundos = '0'+ campoSegundos;
    }

    return campoMinutos+':'+campoSegundos;
}

function duracao(){
    function duracaoNow(){
        let musica = document.querySelector('audio');
        let duracaoMusica = document.querySelector('.fim');
        duracaoMusica.textContent = segundosParaMinuto(Math.floor(musica.duration));
    }
    setInterval(duracaoNow, 1000);
}

function showLoading(){
    var divLoading = document.getElementById('loading');
    divLoading.style.display = 'flex'; 
}

function hideLoading(){
    var divLoading = document.getElementById('loading');
    divLoading.style.display = 'none'; 
}