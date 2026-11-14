const form = document.getElementById('form-projeto');
const inputTitulo = document.getElementById('titulo');
const selectCategoria = document.getElementById('categoria');
const listaProjetos = document.getElementById('lista-projetos');

// Array para armazenar os projetos na memória
let projetos = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = inputTitulo.value.trim();
    const categoria = selectCategoria.value;

    if (titulo === '' || categoria === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const novoProjeto = {
        id: Date.now(),
        titulo: titulo,
        categoria: categoria
    };

    projetos.push(novoProjeto);
    renderizarProjetos();

    form.reset();
    inputTitulo.focus();
});

function removerProjeto(id) {
    projetos = projetos.filter(proj => proj.id !== id);
    renderizarProjetos();
}

function renderizarProjetos() {
    listaProjetos.innerHTML = '';

    if (projetos.length === 0) {
        listaProjetos.innerHTML = '<p style="text-align:center; color:#666; font-size:0.9rem; padding: 1rem;">Nenhum projeto na fila de edição.</p>';
        return;
    }

    projetos.forEach(proj => {
        const li = document.createElement('li');
        li.className = 'item-projeto';

        li.innerHTML = `
            <div class="info-projeto">
                <h3>${proj.titulo}</h3>
                <span>${proj.categoria}</span>
            </div>
            <button class="btn-remover" onclick="removerProjeto(${proj.id})">Excluir</button>
        `;

        listaProjetos.appendChild(li);
    });
}

// Inicializa a lista vazia
renderizarProjetos();