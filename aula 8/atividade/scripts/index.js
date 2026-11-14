const form = document.getElementById('form-edicao');
const inputTelefone = document.getElementById('telefone');
const inputCpf = document.getElementById('cpf');

// ==========================================
// 1. MÁSCARAS DE ENTRADA
// ==========================================

// Máscara de Telefone: (00) 00000-0000
inputTelefone.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    e.target.value = valor;
});

// Máscara de CPF: 000.000.000-00
inputCpf.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = valor;
});

// ==========================================
// 2. FUNÇÕES AUXILIARES DE VALIDAÇÃO
// ==========================================

function mostrarErro(idCampo, mensagem) {
    const campo = document.getElementById(idCampo);
    const spanErro = document.getElementById(`erro-${idCampo}`);
    campo.classList.add('invalido');
    spanErro.textContent = mensagem;
}

function limparErro(idCampo) {
    const campo = document.getElementById(idCampo);
    const spanErro = document.getElementById(`erro-${idCampo}`);
    campo.classList.remove('invalido');
    spanErro.textContent = '';
}

function validarFormulario() {
    let valido = true;

    // 1. Nome
    const nome = document.getElementById('nome').value.trim();
    if (nome.length < 3) {
        mostrarErro('nome', 'Digite seu nome completo (mínimo 3 caracteres).');
        valido = false;
    } else {
        limparErro('nome');
    }

    // 2. Canal
    const canal = document.getElementById('canal').value.trim();
    if (canal === '') {
        mostrarErro('canal', 'Informe o nome do seu canal ou @.');
        valido = false;
    } else {
        limparErro('canal');
    }

    // 3. E-mail
    const email = document.getElementById('email').value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        mostrarErro('email', 'Insira um e-mail válido.');
        valido = false;
    } else {
        limparErro('email');
    }

    // 4. Telefone (mascarado)
    const telefone = inputTelefone.value.trim();
    if (telefone.length < 14) {
        mostrarErro('telefone', 'Informe um telefone completo com DDD.');
        valido = false;
    } else {
        limparErro('telefone');
    }

    // 5. CPF (mascarado)
    const cpf = inputCpf.value.trim();
    if (cpf.length !== 14) {
        mostrarErro('cpf', 'Informe um CPF completo (11 dígitos).');
        valido = false;
    } else {
        limparErro('cpf');
    }

    // 6. Tipo de Vídeo
    const tipoVideo = document.getElementById('tipoVideo').value;
    if (tipoVideo === '') {
        mostrarErro('tipoVideo', 'Selecione o formato do vídeo.');
        valido = false;
    } else {
        limparErro('tipoVideo');
    }

    // 7. Duração
    const duracao = document.getElementById('duracao').value;
    if (duracao === '' || Number(duracao) <= 0) {
        mostrarErro('duracao', 'Informe uma duração válida em minutos.');
        valido = false;
    } else {
        limparErro('duracao');
    }

    // 8. Prazo
    const prazo = document.getElementById('prazo').value;
    if (prazo === '') {
        mostrarErro('prazo', 'Escolha uma data de entrega.');
        valido = false;
    } else {
        limparErro('prazo');
    }

    // 9. Link dos Brutos
    const linkBrutos = document.getElementById('linkBrutos').value.trim();
    if (!linkBrutos.startsWith('http://') && !linkBrutos.startsWith('https://')) {
        mostrarErro('linkBrutos', 'Insira um link válido começando com http:// ou https://');
        valido = false;
    } else {
        limparErro('linkBrutos');
    }

    // 10. Detalhes
    const detalhes = document.getElementById('detalhes').value.trim();
    if (detalhes.length < 10) {
        mostrarErro('detalhes', 'Descreva o estilo da edição (mínimo 10 caracteres).');
        valido = false;
    } else {
        limparErro('detalhes');
    }

    return valido;
}

// ==========================================
// 3. SUBMISSÃO E ENVIO PARA A API
// ==========================================

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    const btnEnviar = document.getElementById('btn-enviar');
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    const dados = {
        nome: document.getElementById('nome').value.trim(),
        canal: document.getElementById('canal').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefone: inputTelefone.value.trim(),
        cpf: inputCpf.value.trim(),
        tipoVideo: document.getElementById('tipoVideo').value,
        duracaoMinutos: Number(document.getElementById('duracao').value),
        prazoEntrega: document.getElementById('prazo').value,
        linkBrutos: document.getElementById('linkBrutos').value.trim(),
        detalhesEdicao: document.getElementById('detalhes').value.trim()
    };

    try {
        const resposta = await fetch('https://postman-echo.com/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        alert('Dados enviados com sucesso! Retorno da API:\n\n' + JSON.stringify(resultado.json, null, 2));
        form.reset();
    } catch (erro) {
        alert('Erro ao enviar os dados para a API: ' + erro.message);
    } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Enviar Briefing';
    }
});