// Guarda os valores do Form em variáveis.
const formMatrizA = document.getElementById("formMatrizA");
const selLinhaMatrizA = document.getElementById("selLinhaMatrizA");
const selColunaMatrizA = document.getElementById("selColunaMatrizA");
const divMatrizA = document.getElementById("divMatrizA");

gerarGridMatrizA()

// Adiciona um evento para quando a variável que recebe o select ter o valor alterado.
selLinhaMatrizA.addEventListener("change", gerarGridMatrizA);
selColunaMatrizA.addEventListener("change", gerarGridMatrizA);

// Função para gerar os inputs da Matriz A
function gerarGridMatrizA() {
    const linhasA = parseInt(selLinhaMatrizA.value);
    const colunasA = parseInt(selColunaMatrizA.value);

    divMatrizA.innerHTML= "";

    for (let i = 0; i < linhasA; i++) {
        const divLinha = document.createElement('div');

        for (let j = 0; j < colunasA; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `A_${i+1}_${j+1}`;
            input.className = 'inputCriarMatriz'
            input.placeholder = `A${i+1}${j+1}`
            input.max = 1000
            divLinha.appendChild(input);
        }

        divMatrizA.appendChild(divLinha);
    }

}

const btnMatrizB = document.getElementById('btnMatrizB');
const sectionEscolhaMatrizB = document.getElementById('sectionEscolhaMatrizB');
let matrizBAtiva = false;

btnMatrizB.addEventListener("click", toggleMatrizB);

// Verifica se a matrizB já existe ou não quando clica no botão, se existir = apaga, se não, envia para a função de gerar matriz.
function toggleMatrizB() {
    if (matrizBAtiva === false){
        matrizBAtiva = true;
        btnMatrizB.textContent = '- REMOVER MATRIZ B';
        gerarMatrizB();
    }
    else {
        matrizBAtiva = false;
        btnMatrizB.textContent = '+ ADICIONAR MATRIZ B';
        sectionEscolhaMatrizB.innerHTML = '';
    }

}

//Cria os selects para as dimensões da matriz B.
function gerarMatrizB() {
    sectionEscolhaMatrizB.innerHTML = `
    <div class="titleForm">
        <p>MATRIZ B</p><hr>
    </div>
    <form action="" id="formMatrizB">
        <div class="divSelects">
            <select name="selLinhaMatrizB" id="selLinhaMatrizB">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3" selected>3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
            <p>x</p>
            <select name="selColunaMatrizB" id="selColunaMatrizB">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3" selected>3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </div>
        <div id="divMatrizB">
        </div>
    </form>`;

    const selLinhaMatrizB = document.getElementById('selLinhaMatrizB');
    const selColunaMatrizB = document.getElementById('selColunaMatrizB');
    
    selLinhaMatrizB.addEventListener('change', gerarGridMatrizB);
    selColunaMatrizB.addEventListener('change', gerarGridMatrizB);

    gerarGridMatrizB();
}

// Cria o grid da matriz B, mesma lógica da matriz A.
function gerarGridMatrizB() {
    const selLinhaMatrizB = document.getElementById('selLinhaMatrizB');
    const selColunaMatrizB = document.getElementById('selColunaMatrizB');
    let divMatrizB = document.getElementById('divMatrizB');
    const linhasB = parseInt(selLinhaMatrizB.value);
    const colunasB = parseInt(selColunaMatrizB.value);

    divMatrizB.innerHTML= "";

    for (let i = 0; i < linhasB; i++) {
        const divLinha = document.createElement('div');

        for (let j = 0; j < colunasB; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `B_${i+1}_${j+1}`;
            input.className = 'inputCriarMatriz'
            input.placeholder =`B${i+1}${j+1}`
            divLinha.appendChild(input);
        }

        divMatrizB.appendChild(divLinha);
    }

}

// Lê os valores de uma matriz
function lerMatriz(prefixo, linhas, colunas) {
    const matriz = [];
    for (let i = 0; i < linhas; i++) {
        const linha = []

        for (let j = 0; j < colunas; j++){
            const input = document.getElementById(`${prefixo}_${i+1}_${j+1}`);
            const valor = parseFloat(input.value) || 0;
            linha.push(valor);
        }
        matriz.push(linha);
    }

    return matriz;
}

//Cria uma lista a partir dos botões das operações
const btnSelctOperacao = document.querySelectorAll('.btnOperacao');
const btnCalcularOperacao = document.getElementById("btnCalcularOperacao");
let operacaoSelecionada = null;

//Percorre todos os botões, e adiciona um evento para quando algum deles for clicado, assim aparece o botão de calcular, e salva o ID do último botão clicado, para sabermos qual operação fazer.
btnSelctOperacao.forEach(function(btn) {
    btn.addEventListener('click', function() {
        operacaoSelecionada = btn.id;
        btnCalcularOperacao.style.display = 'block'
        
        btnSelctOperacao.forEach(function(b) {
            b.classList.remove('btnOperacaoAtivo');
        })
        btn.classList.add('btnOperacaoAtivo');
    })
})

//Verifica operação escolhida e envia para a função que calcula tal operaçao.
btnCalcularOperacao.addEventListener('click', verificarOperacao);
function verificarOperacao() {

    console.log('A', selLinhaMatrizA.value, selColunaMatrizA.value)

    if (operacaoSelecionada === 'btnTransposta'){
        calcularTransposta();
    }
    else if (operacaoSelecionada === 'btnProdutoAAT') {
        calcularProdutoAAT();
    }
    else if (operacaoSelecionada === 'btnProdutoAtA') {
        calcularProdutoAtA();
    }
    else if (operacaoSelecionada === 'btnMultEscalar'){
        calcularMultEscalar();
    }
    else if (operacaoSelecionada === 'btnDeterminante'){
        calcularDeterminante();
    }
    else if (operacaoSelecionada === 'btnInversa'){
        calcularInversa();
    }
}

function calcularTransposta() {
    const linhas = parseInt(selLinhaMatrizA.value);
    const colunas = parseInt(selColunaMatrizA.value);
    const matrizA = lerMatriz('A', linhas, colunas);

    const transposta = [];

    for (let i = 0; i < colunas; i++) {
        const linha = [];
        
        for (let j = 0; j < linhas; j++) {
            linha.push(matrizA[j][i])
        }

        transposta.push(linha)
    }
    console.log(transposta);
}
