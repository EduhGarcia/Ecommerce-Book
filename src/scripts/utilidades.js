export const catalogo = [
    {
        id: "1",
        nome: "O que vi dos presidentes",
        preco: 78.49,
        imagem: "produto-1.jpg",
        capa: "comum",
        capaComum: true
    },
    {
        id: "2",
        nome: "Uma dieta além da moda",
        preco: 47.90,
        imagem: "produto-2.jpg",
        capa: "comum",
        capaComum: true
    },
    {
        id: "3",
        nome: "As 48 leis do poder",
        preco: 39.92,
        imagem: "produto-3.jpg",
        capa: "comum",
        capaComum: true
    },
    {
        id: "4",
        nome: "Vade Mecum Saraiva",
        preco: 165.80,
        imagem: "produto-4.jpg",
        capa: "dura",
        capaComum: false
    },
    {
        id: "5",
        nome: "Na calada da noite",
        preco: 47.92,
        imagem: "produto-5.jpg",
        capa: "dura",
        capaComum: false
    },
    {
        id: "6",
        nome: "O cheiro de mel queimado",
        preco: 45.43,
        imagem: "produto-6.jpg",
        capa: "comum",
        capaComum: true
    },
    {
        id: "7",
        nome: "A vila dos tecidos",
        preco: 60.19,
        imagem: "produto-7.jpg",
        capa: "dura",
        capaComum: false
    },
]

export function salvarLocalStorage(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao))
}

export function lerLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave))
}

export function exluirDoLocalStorage(chave) {
    localStorage.removeItem(chave)
}

export function desenharProdutoCarrinhoSimples(idProduto, idContainerHtml, quantidadeProduto) {
    const produto = catalogo.find(p => p.id === idProduto)
    const containerProdutoCarrinho = document.getElementById(idContainerHtml)

    const elementoArticle = document.createElement('article')
    elementoArticle.classList.add('card-carrinho')

    const cartaoProdutoCarrrinho = `
    <img src="./assets/img/${produto.imagem}" alt="carrinho: ${produto.nome}">
        
    <div class="caracteristicas-produto-carrinho">
        <p>${produto.nome}</p>
        <p>capa: ${produto.capa}</p>
        <p>$${produto.preco}</p>
    </div>

    <div class="quantidade-produto-carrinho">
        <p id="quantidade-${produto.id}">Quantidade de Produtos: ${quantidadeProduto}</p>
    </div>
    `
    elementoArticle.innerHTML = cartaoProdutoCarrrinho
    containerProdutoCarrinho.appendChild(elementoArticle)
}