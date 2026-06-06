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
    const btnAdicao = document.getElementById('btnAdicao');
    const btnSubtracao = document.getElementById('btnSubtracao');
    const btnMultAB = document.getElementById('btnMultiplicacaoAB');
    const btnMultBA = document.getElementById('btnMultiplicacaoBA');
        
    if (matrizBAtiva === false){
        matrizBAtiva = true;
        btnMatrizB.textContent = '- REMOVER MATRIZ B';
        gerarMatrizB();
        
        btnAdicao.style.display = 'block';
        btnSubtracao.style.display = 'block';
        btnMultAB.style.display = 'block';
        btnMultBA.style.display = 'block';
    }
    else {
        matrizBAtiva = false;
        btnMatrizB.textContent = '+ ADICIONAR MATRIZ B';
        sectionEscolhaMatrizB.innerHTML = '';
        btnAdicao.style.display = 'none';
        btnSubtracao.style.display = 'none';
        btnMultAB.style.display = 'none';
        btnMultBA.style.display = 'none';
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

        if (btn.id === 'btnMultEscalar') {
            document.getElementById('divInputEscalar').style.display = 'block'
        } else {
            document.getElementById('divInputEscalar').style.display = 'none'
        }
    })
})

//Verifica operação escolhida e envia para a função que calcula tal operaçao.
btnCalcularOperacao.addEventListener('click', verificarOperacao);
function verificarOperacao() {
    if (operacaoSelecionada === 'btnTransposta'){
        calcularTransposta();
    }
    else if (operacaoSelecionada === 'btnProdutoAAt') {
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
    else if (operacaoSelecionada === 'btnAdicao'){
        if (matrizBAtiva === true){
           calcularAdicao(); 
        }
        else{
            alert('Selecione uma operação');
        }
    }
    else if (operacaoSelecionada === 'btnSubtracao'){
        if (matrizBAtiva === true){
            calcularSubtracao();
        }
        else{
            alert('Selecione uma operação');
        }
    }
    else if (operacaoSelecionada === 'btnMultiplicacaoAB'){
        if (matrizBAtiva){
            calcularMultiplicacaoAB();
        }
        else{
            alert('Selecione uma operação');
        }
        
    }
    else if (operacaoSelecionada === 'btnMultiplicacaoBA'){
        if (matrizBAtiva === true){
            calcularMultiplicacaoBA();
        }
        else{
            alert("Selecione uma operação")
        }
    }
}
function getDimensoes() {
    const linhasA = parseInt(selLinhaMatrizA.value);
    const colunasA = parseInt(selColunaMatrizA.value);
    
    let linhasB = 0;
    let colunasB = 0;
    
    if (matrizBAtiva) {
        linhasB = parseInt(document.getElementById('selLinhaMatrizB').value);
        colunasB = parseInt(document.getElementById('selColunaMatrizB').value);
    }
    
    return { linhasA, colunasA, linhasB, colunasB };
}

function calcularTransposta() {
    const { linhasA, colunasA} = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const transposta = [];

    for (let i = 0; i < colunasA; i++) {
        const linha = [];
        
        for (let j = 0; j < linhasA; j++) {
            linha.push(MatrizA[j][i])
        }

        transposta.push(linha)
    }

    console.log(transposta);
    return transposta;
}
function calcularProdutoAAT() {
    const { linhasA, colunasA} = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);

    const transposta = calcularTransposta();
    const matrizAAT = [];
    
    for (let i = 0; i < linhasA; i++){
        const linha = [];
        for (let j = 0; j < linhasA; j++){
            let soma = 0;

            for (let k = 0; k < colunasA; k++){
                soma += MatrizA[i][k] * transposta[k][j]
            }
            linha.push(soma);
        }
        matrizAAT.push(linha)
    }

    console.log(matrizAAT);
    return matrizAAT;
}
function calcularProdutoAtA() {
    const { linhasA, colunasA } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);

    const transposta = calcularTransposta();
    const matrizAtA = [];
    
    for (let i = 0; i < colunasA; i++){
        const linha = [];
        for (let j = 0; j < colunasA; j++){
            let soma = 0;

            for (let k = 0; k < linhasA; k++){
                soma += transposta[i][k] * MatrizA[k][j]
            }
            linha.push(soma);
        }
        matrizAtA.push(linha)
    }

    console.log(matrizAtA);
    return matrizAtA;
}
function calcularMultEscalar() {
    const { linhasA, colunasA} = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);

    const valorK = document.getElementById('inputEscalar').value;
    const matrizMultEscalar = [];

    for (let i = 0; i < linhasA; i++){
        const linha = [];
        let mult = 0;
        for (let j = 0; j < colunasA; j++){
            mult = MatrizA[i][j] * valorK;
            linha.push(mult);
        } 
        matrizMultEscalar.push(linha)
    } 

    console.log(matrizMultEscalar);
    return matrizMultEscalar;
}
function calcularAdicao() {
    const { linhasA, colunasA, linhasB, colunasB } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const MatrizB = lerMatriz('B', linhasB, colunasB);

    const matrizSoma = []

    console.log(linhasA, linhasB, colunasA, colunasB)
    if(linhasA === linhasB && colunasA === colunasB){
        for (let i = 0; i < linhasA; i++)
        {
            let linha = [];
            for (let j = 0; j < colunasA; j++)
            {
                linha.push(MatrizA[i][j] + MatrizB[i][j]);
            }
            matrizSoma.push(linha);
        }
        console.log(matrizSoma);
        return(matrizSoma);
    }
    else {
        alert('As matrizes devem ser da mesma dimensão');
    }
}
function calcularSubtracao() {
    const { linhasA, colunasA, linhasB, colunasB } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const MatrizB = lerMatriz('B', linhasB, colunasB);

    const matrizSubtracao = []

    console.log(linhasA, linhasB, colunasA, colunasB)
    if(linhasA === linhasB && colunasA === colunasB){
        for (let i = 0; i < linhasA; i++)
        {
            let linha = [];
            for (let j = 0; j < colunasA; j++)
            {
                linha.push(MatrizA[i][j] - MatrizB[i][j]);
            }
            matrizSubtracao.push(linha);
        }
        console.log(matrizSubtracao);
        return(matrizSubtracao)
    }
    else {
        alert('As matrizes devem ser da mesma dimensão');
    }
}
function calcularMultiplicacaoAB() {
    const { linhasA, colunasA, linhasB, colunasB } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const MatrizB = lerMatriz('B', linhasB, colunasB);

    const matrizMultAB = []

    console.log(linhasA, linhasB, colunasA, colunasB)
    if(colunasA === linhasB){
        for (let i = 0; i < linhasA; i++){
        const linha = [];
        for (let j = 0; j < colunasB; j++){
            let soma = 0;

            for (let k = 0; k < colunasA; k++){
                soma += MatrizA[i][k] * MatrizB[k][j]
            }
            linha.push(soma);
        }
        matrizMultAB.push(linha)
    }
        console.log(matrizMultAB);
        return(matrizMultAB)
    }
    else {
        alert('As colunas da MatrizA devem ter dimensão igual as dimensões da linhas da MatrizB');
    }
}
function calcularMultiplicacaoBA() {
    const { linhasA, colunasA, linhasB, colunasB } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const MatrizB = lerMatriz('B', linhasB, colunasB);

    const matrizMultBA = []

    console.log(linhasA, linhasB, colunasA, colunasB)
    if(colunasB === linhasA){
        for (let i = 0; i < linhasB; i++){
        const linha = [];
        for (let j = 0; j < colunasA; j++){
            let soma = 0;

            for (let k = 0; k < colunasB; k++){
                soma +=  MatrizB[i][k] * MatrizA[k][j]
            }
            linha.push(soma);
        }
        matrizMultBA.push(linha)
    }
        console.log(matrizMultBA);
        return(matrizMultBA)
    }
    else {
        alert('As colunas da MatrizB devem ter dimensão igual as dimensões da linhas da MatrizA');
    }
}
function calcularDeterminante() {
    const { linhasA, colunasA} = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);

    let det = 0;

    if (linhasA === colunasA){
        if (linhasA === 1 && colunasA === 1){
            det = MatrizA[0][0];
            console.log(det);
        }
        else if (linhasA === 2 && colunasA === 2){
            det = MatrizA[0][0] * MatrizA[1][1] - MatrizA[0][1] * MatrizA[1][0];
            console.log(det);
        }
        else {

        }
    }
    else {
        alert('O número de colunas e de linhas da Matriz devem ser iguais')
    }
}