import { atualizarPrecoCarrinho } from "./menu-carrinho.js"
import { desenharProdutoCarrinhoSimples, exluirDoLocalStorage, lerLocalStorage, salvarLocalStorage } from "./utilidades.js"

let count = 0

function desenharProdutoCheckout() {
    const idsProdutosCarrinhosComQuantidade = lerLocalStorage('carrinho') ?? {}

    for (const idProduto in idsProdutosCarrinhosComQuantidade) {
        desenharProdutoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutosCarrinhosComQuantidade[idProduto])
    }
}

function retirarLabelCampoVazio() {
    const inputs = document.querySelectorAll("input")
    const campoObrigatorio = document.querySelectorAll('.campo-obrigatorio')
    console.log('riasia')
    inputs.forEach((element, index) => {
        element.addEventListener('change', () => {
            if (element.value !== '') {
                campoObrigatorio[index].classList.remove('habilitado')
            }
        })
        
    })
}

function indetificarCamposObrigatorios() {
    const inputs = document.querySelectorAll("input")
    const campoObrigatorio = document.querySelectorAll('.campo-obrigatorio')

    inputs.forEach((element, index) => {
        if (element.value === "") {
            campoObrigatorio[index].classList.add('habilitado')
            count = 0
        } else {
            count++
        }
    });
}

function finalizarCompra(evento) {
    evento.preventDefault()
    const idsProdutosCarrinhosComQuantidade = lerLocalStorage('carrinho') ?? {}

    indetificarCamposObrigatorios()

    if (Object.keys(idsProdutosCarrinhosComQuantidade).length !== 0 && count === 10) {
        const dataAtual = new Date()
        const pedidoFeito = {
            dataPedido: dataAtual,
            pedido: idsProdutosCarrinhosComQuantidade
        }
        const historicoDePedidos = lerLocalStorage('historico') ?? []
        const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos]
        salvarLocalStorage('historico', historicoDePedidosAtualizado)

        exluirDoLocalStorage('carrinho')
        window.location.href = window.location.origin + '/pedidos.html'
    }
}

desenharProdutoCheckout()
atualizarPrecoCarrinho()
retirarLabelCampoVazio()

document.addEventListener('submit', (evt) => finalizarCompra(evt))