import { lerLocalStorage, desenharProdutoCarrinhoSimples } from "./utilidades.js";

function criarProdutoHistorico(pedidoComData) {
    const elementoPedido = `<p class="data-pedido">${new Date(pedidoComData.dataPedido).toLocaleDateString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    })}</p>
    <section class="container-pedidos" id="container-pedidos-${pedidoComData.dataPedido}"></section>`
    const main = document.getElementsByTagName('main')[0]
    main.innerHTML += elementoPedido

    for ( const idProduto in pedidoComData.pedido ){
        desenharProdutoCarrinhoSimples(idProduto, `container-pedidos-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto])
    }
}

function renderizarHistoricoPedido () {
    const historico = lerLocalStorage('historico')
    for ( const pedidoComData of historico ) {
        criarProdutoHistorico(pedidoComData)
    }
}

renderizarHistoricoPedido()