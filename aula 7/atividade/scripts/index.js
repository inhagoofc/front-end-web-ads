
const telaVideo = document.getElementById('tela-video');
const statusPlayer = document.getElementById('status-player');
const btnPlay = document.getElementById('btn-play');
const btnLike = document.getElementById('btn-like');
const contadorLikes = document.getElementById('contador-likes');
const btnInscrever = document.getElementById('btn-inscrever');
const mensagemFeedback = document.getElementById('mensagem-feedback');

let reproduzindo = false;
let likes = 0;
let inscrito = false;

btnPlay.addEventListener('click', () => {
    reproduzindo = !reproduzindo;

    if (reproduzindo) {
        statusPlayer.textContent = '▶ Reproduzindo vídeo...';
        telaVideo.classList.add('tocando');
        mensagemFeedback.textContent = 'Você iniciou a reprodução do vídeo!';
    } else {
        statusPlayer.textContent = '⏸ Vídeo Pausado';
        telaVideo.classList.remove('tocando');
        mensagemFeedback.textContent = 'Vídeo pausado.';
    }
});


btnLike.addEventListener('click', () => {
    likes++;
    contadorLikes.textContent = likes;
    mensagemFeedback.textContent = `Obrigado pelo like! Total de curtidas: ${likes}`;
});

btnInscrever.addEventListener('click', () => {
    inscrito = !inscrito;

    if (inscrito) {
        btnInscrever.textContent = '✔ Inscrito';
        btnInscrever.classList.add('inscrito');
        mensagemFeedback.textContent = 'Inscrição confirmada no canal!';
        alert('Você agora está inscrito no canal!');
    } else {
        btnInscrever.textContent = '🔔 Inscrever-se';
        btnInscrever.classList.remove('inscrito');
        mensagemFeedback.textContent = 'Você cancelou a inscrição.';
    }
});