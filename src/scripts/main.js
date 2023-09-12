import { renderizarCatalago } from "./cartao-produto.js"
import { inicializarFiltros } from "./filtros-catalago.js"
import { inicializadorCarrinho, renderizarProdutosCarrinho } from "./menu-carrinho.js"

renderizarCatalago()
inicializadorCarrinho()
renderizarProdutosCarrinho()
inicializarFiltros()