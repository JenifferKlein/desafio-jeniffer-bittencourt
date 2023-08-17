class CaixaDaLanchonete {
    //lista com os valores dos itens
    precos = {
        cafe: {
            price: 3.00,
        },
        chantily: {
            price: 1.50,
            requires: 'cafe',
        },
        suco: {
            price: 6.20,
        },
        sanduiche: {
            price: 6.50,
        },
        queijo: {
            price: 2.00,
            requires: 'sanduiche',
        },
        salgado: {
            price: 7.25,
        },
        combo1: {
            price: 9.50,
        },
        combo2: {
            price: 7.50,
        },
    };

    calcularValorDaCompra(metodoDePagamento, itens) {
        //variavel para armazenar o total da compra
        let total = 0;
        //metodo responsavel para verificar se algum item extra foi pedido sem ter o acompanhamento de um item principal
        const verifica = this.verificaItem(itens);
        if (!verifica) {
            return "Item extra não pode ser pedido sem o principal";
        }
        //verifica se um carrinho esta vazio
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
        //para cada item da lista, verifica se a quantidade é valida e se o item existe na lista
        for (const item of itens) {
            const [nome, quantidade] = item.split(',');
            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }
            if (!this.precos[nome]) {
                return "Item inválido!";
            }
            //se o item existir então é feito o calculo do preco total
            total += this.precos[nome].price * parseInt(quantidade);
        }
        //verifica a forma de pagamento para poder fazer o calculo de acordo com o soliciado para cada metodo de pagamento
        switch (metodoDePagamento) {
            case 'credito':
                total += (total * 0.03);
                return this.formataValor(total);
            case 'debito':
                return this.formataValor(total);
            case 'dinheiro':
                total *= 0.95;
                return this.formataValor(total);
            default:
                return "Forma de pagamento inválida!";
        }
    }
    //metodo para formatar o valor adicionando o R$ e trocando o . por ,
    formataValor(valor) {
        //Este return comentado é uma outra alternativa para a formatação do valor
        // return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return `R$ ${valor.toFixed(2).replace(".", ",")}`;
    }
    // valida se o item extra foi pedido com pelo menos um item principal
    verificaItem(itens) {
        for (const item of itens) {
            const [nome, quantidade] = item.split(',');
            if (quantidade > 0 && this.precos[nome]?.requires) {
                let hasAnyItem = false;
                const necessita = this.precos[nome].requires
                for (const item2 of itens) {
                    const [nome2, quantidade2] = item2.split(',');
                    if (nome2 === necessita && quantidade2 > 0) {
                        hasAnyItem = true;
                        break;
                    }
                }
                if (!hasAnyItem) {
                    return false;
                }
            }
        }
        return true;
    }
}
export { CaixaDaLanchonete };
