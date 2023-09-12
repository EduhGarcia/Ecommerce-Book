const produtosCatalago = document.getElementById('container-products')

function esconderCapaDura() {
    mostrarTodos()

    const livrosCapaDura = Array.from(produtosCatalago.getElementsByClassName('capa-dura'))
    for (const livro of livrosCapaDura) {
        livro.classList.add('esconder-produto')
    }
}

function esconderCapaComum() {
    mostrarTodos()

    const livrosCapaComum = Array.from(produtosCatalago.getElementsByClassName('capa-comum'))
    for (const livro of livrosCapaComum) {
        livro.classList.add('esconder-produto')
    }
}

function mostrarTodos() {
    const produtosEscondidos = Array.from(produtosCatalago.getElementsByClassName('esconder-produto'))

    for (const livro of produtosEscondidos) {
        livro.classList.remove('esconder-produto')
    }
}

export function inicializarFiltros() {
    document.getElementById('exibir-capa-comum').addEventListener('click', esconderCapaDura)
    document.getElementById('exibir-capa-dura').addEventListener('click', esconderCapaComum)
    document.getElementById('exibir-todos').addEventListener('click', mostrarTodos)
}