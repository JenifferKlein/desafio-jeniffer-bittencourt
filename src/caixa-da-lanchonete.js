class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        //lista de precos
        const precos = {
            cafe: 3.00,
            chantily: 1.50, //item extra(cafe)
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00, //item extra(sanduiche)
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };
        //variavel para armazenar o total da compra
        let total = 0; 
        //metodo rensponsavel para verificar se um item extra foi pedido sem o item principal
        const verifica = this.verificaItem(itens); 
        if(verifica === 1){                       
            return "Item extra não pode ser pedido sem o principal";
        }
        //verifica se um carrinho esta vazio
        if(itens.length === 0){
            return "Não há itens no carrinho de compra!";
        }
        //para cada item da lista, verifica se a quantidade é valida e se o item existe na lista
        for (const item of itens) {
            const [nome, quantidade] = item.split(',');
            if(quantidade <= 0){
                return "Quantidade inválida!";
            }
            if(!precos[nome]){
                return "Item inválido!";
            }
            //se ele existir então é calculado o preco total
            if (precos[nome]) {
                total += precos[nome] * parseInt(quantidade);
            }
        }
        //verifica a forma de pagamento para poder fazer o calculo de acordo com o soliciado para cada metodo de pagamento
        const formaPagamento = metodoDePagamento;
        switch(formaPagamento){
            case 'credito':
                total += (total * 0.03);
                return this.formataValor(total.toFixed(2));
            case 'debito':
                return this.formataValor(total.toFixed(2));
            case 'dinheiro':
                total *= 0.95;
                return this.formataValor(total.toFixed(2));
            default:
                return "Forma de pagamento inválida!";
        }
    }
    //metodo para formatar o valor adicionando o R$ e trocando o . por ,
    formataValor(valor) {
        //return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return `R$ ${valor.toString().replace(".", ",")}`;
    }

    verificaItem(itens){
        let cont1 = 0;
        let cont2 = 0;
        let cont3 = 0;
        let cont4 = 0;
        for(const item of itens){
            const [nome, quantidade] = item.split(',');
            if(nome === 'chantily' && quantidade > 0){
                cont1++;
            }
            if(nome === 'cafe' && quantidade > 0){
                cont2++;
            }
            if(nome === 'queijo' && quantidade > 0){
                cont3++;
            }
            if(nome === 'sanduiche' && quantidade > 0){
                cont4++;
            }
        }
        if(cont1 > 0  && cont2 === 0){
            return 1;
        }
        if(cont3 > 0  && cont4 === 0){
            return 1;
        }
    }
}

export { CaixaDaLanchonete };
