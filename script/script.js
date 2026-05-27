// Guarda os valores do Form em variáveis
const formMatrizA = document.getElementById("formMatrizA");
const selLinhaMatrizA = document.getElementById("selLinhaMatrizA");
const selColunaMatrizA = document.getElementById("selColunaMatrizA");
const divMatrizA = document.getElementById("divMatrizA");

gerarMatrizA()

// Adiciona um evento para quando a variável que recebe o select ter o valor alterado
selLinhaMatrizA.addEventListener("change", gerarMatrizA);
selColunaMatrizA.addEventListener("change", gerarMatrizA);

// Função para gerar os inputs da Matriz
function gerarMatrizA() {
    const linhas = parseInt(selLinhaMatrizA.value);
    const colunas = parseInt(selColunaMatrizA.value);

    divMatrizA.innerHTML= "";

    for (let i = 0; i < linhas; i++) {
        const divLinha = document.createElement('div');

        for (let j = 0; j < colunas; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `A_${i+1}_${j+1}`;
            input.className = 'inputCriarMatriz'
            input.placeholder = '0'
            divLinha.appendChild(input);
        }

        divMatrizA.appendChild(divLinha);
    }

}