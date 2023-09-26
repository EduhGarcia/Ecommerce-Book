import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades.js"

const carrinho = document.getElementById('carrinho')
const idsProdutosCarrinhosComQuantidade = lerLocalStorage('carrinho') ?? {}

function desenharProdutoNoCarrinho(idProduto) {
    const produto = catalogo.find(p => p.id === idProduto)
    const containerProdutoCarrinho = document.getElementById('produtos-carrinho')

    const elementoArticle = document.createElement('article')
    elementoArticle.classList.add('card-carrinho')

    atualizarPrecoCarrinho()

    elementoArticle.innerHTML = `
    <button id="remover-item-${produto.id}" class="excluir-card"><i class="fa-solid fa-circle-xmark"></i></button>
        
    <img src="./assets/img/${produto.imagem}" alt="carrinho: ${produto.nome}">
        
    <div class="caracteristicas-produto-carrinho">
        <p>${produto.nome}</p>
        <p>capa: ${produto.capa}</p>
        <p>$${produto.preco}</p>
    </div>

    <div class="quantidade-produto-carrinho">
        <button id="decrementar-produto-${produto.id}">-</button>
        <p id="quantidade-${produto.id}">${idsProdutosCarrinhosComQuantidade[produto.id]}</p>
        <button id="incrementar-produto-${produto.id}">+</button>
    </div>
    `
    
    containerProdutoCarrinho.appendChild(elementoArticle)

    document.getElementById(`decrementar-produto-${produto.id}`)
        .addEventListener('click', () => decrementarQuantidadeProduto(produto.id))

    document.getElementById(`incrementar-produto-${produto.id}`)
        .addEventListener('click', () => incrementarQuantidadeProduto(produto.id))

    document.getElementById(`remover-item-${produto.id}`)
        .addEventListener('click', () => removerDoCarrinho(produto.id))
}

function abrirCarrinho() {
    carrinho.classList.add('carrinho-aberto')
    carrinho.classList.remove('carrinho-fechado')
}

function fecharCarrinho() {
    carrinho.classList.remove('carrinho-aberto')
    carrinho.classList.add('carrinho-fechado')
}

function irParaCheckout() {
    if(Object.keys(idsProdutosCarrinhosComQuantidade).length !== 0) {
        window.location.href = window.location.origin + './checkout.html'
    }
}

export function renderizarProdutosCarrinho() {
    const containerProdutoCarrinho = document.getElementById('produtos-carrinho')
    containerProdutoCarrinho.innerHTML = ""

    for (const idProduto in idsProdutosCarrinhosComQuantidade) {
        desenharProdutoNoCarrinho(idProduto)
    }
}

function incrementarQuantidadeProduto(idProduto) {
    idsProdutosCarrinhosComQuantidade[idProduto]++
    salvarLocalStorage('carrinho', idsProdutosCarrinhosComQuantidade)
    atualizarInformacaoQuantidade(idProduto)
}

function decrementarQuantidadeProduto(idProduto) {
    if (idsProdutosCarrinhosComQuantidade[idProduto] === 1) {
        removerDoCarrinho(idProduto)
        return
    }

    idsProdutosCarrinhosComQuantidade[idProduto]--
    salvarLocalStorage('carrinho', idsProdutosCarrinhosComQuantidade)
    atualizarInformacaoQuantidade(idProduto)
}

function atualizarInformacaoQuantidade(idProduto) {
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutosCarrinhosComQuantidade[idProduto]

    atualizarPrecoCarrinho()
}

function removerDoCarrinho(idProduto) {
    delete idsProdutosCarrinhosComQuantidade[idProduto]
    renderizarProdutosCarrinho()
    salvarLocalStorage('carrinho', idsProdutosCarrinhosComQuantidade)
    atualizarPrecoCarrinho()
}

export function atualizarPrecoCarrinho() {
    const precoCarrinho = document.getElementById('preco-total')
    let valorTotalCarrinho = 0
    
    for (const idProdutoCarrinho in idsProdutosCarrinhosComQuantidade) {
        valorTotalCarrinho += catalogo.find(p => p.id === idProdutoCarrinho)
        .preco * idsProdutosCarrinhosComQuantidade[idProdutoCarrinho]
    }

    precoCarrinho.innerText = `Preço total: $${valorTotalCarrinho.toFixed(2)}`
}

export function inicializadorCarrinho() {
    const btnFecharCarrinho = document.getElementById('fechar-carrinho')
    const btnAbrirCarrinho = document.getElementById('abrir-carrinho')
    const btnIrParaCheckout = document.getElementById('finalizar-pedido')

    btnFecharCarrinho.addEventListener('click', fecharCarrinho)
    btnAbrirCarrinho.addEventListener('click', abrirCarrinho)

    atualizarPrecoCarrinho()
    btnIrParaCheckout.addEventListener('click', irParaCheckout)
}

export function adicionarAoCarrinho(idProduto) {
    if (idProduto in idsProdutosCarrinhosComQuantidade) {
        incrementarQuantidadeProduto(idProduto)
        return
    }

    idsProdutosCarrinhosComQuantidade[idProduto] = 1
    salvarLocalStorage('carrinho', idsProdutosCarrinhosComQuantidade)
    desenharProdutoNoCarrinho(idProduto)
}