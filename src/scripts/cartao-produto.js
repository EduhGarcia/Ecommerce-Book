import { catalogo } from "./utilidades.js"
import { adicionarAoCarrinho } from "./menu-carrinho.js"

export function renderizarCatalago() {
    for (const productCatalog of catalogo) {
        const cardProduct = `
            <div id="card-product-${productCatalog.id}" class="card-product ${productCatalog.capaComum ? 'capa-comum' : 'capa-dura'}">
                <img src="./assets/img/${productCatalog.imagem}" alt="produto ${productCatalog.id} do catalogo">

                <h2>${productCatalog.nome}</h2>
                <p>Tipo capa: ${productCatalog.capa}</p>
                <p>$${productCatalog.preco}</p>

                <button id="adicionar-${productCatalog.id}" class="btn-adicionar-ao-carrinho"><i class="fa-solid fa-cart-plus"></i></button>
            </div>`

        document.getElementById('container-products').innerHTML += cardProduct
    }

    for (const productCatalog of catalogo) {
        const produtoAdicionado = document.getElementById(`adicionar-${productCatalog.id}`)
        produtoAdicionado.addEventListener('click', () => adicionarAoCarrinho(productCatalog.id))
    }
}