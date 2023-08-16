class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
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

        let total = 0;

        const verifica = this.verificaItem(itens);
        if(verifica === 1){
            return "Item extra não pode ser pedido sem o principal";
        }

        if(itens.length === 0){
            return "Não há itens no carrinho de compra!";
        }

        for (const item of itens) {
            const [nome, quantidade] = item.split(',');
            if(quantidade <= 0){
                return "Quantidade inválida!";
            }
            if(!precos[nome]){
                return "Item inválido!";
            }

            if (precos[nome]) {
                total += precos[nome] * parseInt(quantidade);
            }
        }

        if(metodoDePagamento !='credito' && metodoDePagamento != 'debito' && metodoDePagamento != 'dinheiro' ){
            return "Forma de pagamento inválida!";
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
            return this.formataValor(total.toFixed(2));
        }

        if (metodoDePagamento === 'credito') {
            total += (total * 0.03);
            return this.formataValor(total.toFixed(2));
        }

        if (metodoDePagamento === 'debito') {
            return this.formataValor(total.toFixed(2));
        }
    }
    
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
