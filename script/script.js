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
    return transposta;
}
function calcularProdutoAAT() {
    console.log('entrou na função!') // adiciona essa linha
    const linhas = parseInt(selLinhaMatrizA.value);
    const colunas = parseInt(selColunaMatrizA.value);
    const matrizA = lerMatriz('A', linhas, colunas);
    const transposta = calcularTransposta();
    const matrizAAT = [];
    
    for (let i = 0; i < linhas; i++){
        const linha = [];
        for (let j = 0; j < linhas; j++){
            let soma = 0;

            for (let k = 0; k < colunas; k++){
                soma += matrizA[i][k] * transposta[k][j]
            }
            linha.push(soma);
        }
        matrizAAT.push(linha)
    }

    console.log(matrizAAT);
    return matrizAAT;
}
function calcularProdutoAtA() {

    console.log('produto ata')
    const linhas = parseInt(selLinhaMatrizA.value);
    const colunas = parseInt(selColunaMatrizA.value);
    const matrizA = lerMatriz('A', linhas, colunas);
    const transposta = calcularTransposta();
    const matrizAtA = [];
    
    for (let i = 0; i < colunas; i++){
        const linha = [];
        for (let j = 0; j < colunas; j++){
            let soma = 0;

            for (let k = 0; k < linhas; k++){
                soma += transposta[i][k] * matrizA[k][j]
            }
            linha.push(soma);
        }
        matrizAtA.push(linha)
    }

    console.log(matrizAtA);
    return matrizAtA;
}
function calcularMultEscalar() {
    console.log("multescalar");
    const linhas = parseInt(selLinhaMatrizA.value);
    const colunas = parseInt(selColunaMatrizA.value);
    const matrizA = lerMatriz('A', linhas, colunas);
    const valorK = document.getElementById('inputEscalar').value;
    const matrizMultEscalar = [];

    for (let i = 0; i < linhas; i++){
        const linha = [];
        let mult = 0;
        for (let j = 0; j < colunas; j++){
            mult = matrizA[i][j] * valorK;
            linha.push(mult);
        } 
        matrizMultEscalar.push(linha)
    } 

    console.log(matrizMultEscalar);
    return matrizMultEscalar;
}
function calcularAdicao() {
    const linhasA = parseInt(selLinhaMatrizA.value);
    const colunasA = parseInt(selColunaMatrizA.value);
    
    const selLinhaMatrizB = document.getElementById('selLinhaMatrizB');
    const selColunaMatrizB = document.getElementById('selColunaMatrizB');
    const linhasB = parseInt(selLinhaMatrizB.value);
    const colunasB = parseInt(selColunaMatrizB.value);

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
    }
    else {
        alert('As matrizes devem ser da mesma dimensão');
    }
}
function calcularSubtracao() {
    const linhasA = parseInt(selLinhaMatrizA.value);
    const colunasA = parseInt(selColunaMatrizA.value);
    
    const selLinhaMatrizB = document.getElementById('selLinhaMatrizB');
    const selColunaMatrizB = document.getElementById('selColunaMatrizB');
    const linhasB = parseInt(selLinhaMatrizB.value);
    const colunasB = parseInt(selColunaMatrizB.value);

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
    }
    else {
        alert('As matrizes devem ser da mesma dimensão');
    }
}
function calcularMultiplicacaoAB() {
    const linhasA = parseInt(selLinhaMatrizA.value);
    const colunasA = parseInt(selColunaMatrizA.value);
    
    const selLinhaMatrizB = document.getElementById('selLinhaMatrizB');
    const selColunaMatrizB = document.getElementById('selColunaMatrizB');
    const linhasB = parseInt(selLinhaMatrizB.value);
    const colunasB = parseInt(selColunaMatrizB.value);

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
    }
    else {
        alert('As colunas da MatrizA devem ter dimensão igual as dimensões da linhas da MatrizB');
    }
}
function calcularMultiplicacaoBA() {
    const linhasA = parseInt(selLinhaMatrizA.value);
    const colunasA = parseInt(selColunaMatrizA.value);
    
    const selLinhaMatrizB = document.getElementById('selLinhaMatrizB');
    const selColunaMatrizB = document.getElementById('selColunaMatrizB');
    const linhasB = parseInt(selLinhaMatrizB.value);
    const colunasB = parseInt(selColunaMatrizB.value);

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
    }
    else {
        alert('As colunas da MatrizB devem ter dimensão igual as dimensões da linhas da MatrizA');
    }
}
function calcularDeterminante() {
    const linhas = parseInt(selLinhaMatrizA.value);
    const colunas = parseInt(selColunaMatrizA.value);
    const matriz = lerMatriz('A', linhas, colunas)
    let det = 0;

    if (linhas === colunas){
        if (linhas === 2 && colunas === 2){
            det = matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
            console.log(det);
        }
    }
    else {
        alert('O número de colunas e de linhas da Matriz devem ser iguais')
    }
}