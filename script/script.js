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
    const { linhasA, colunasA } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const transposta = [];

    const passos = [];
    passos.push(`Matriz A (${linhasA}x${colunasA}):`);
    passos.push(matrizParaTexto(MatrizA));
    passos.push(`Regra: A[i][j] = Aᵀ[j][i] — cada elemento troca de posição (linha vira coluna).`);

    for (let i = 0; i < colunasA; i++) {
        const linha = [];
        for (let j = 0; j < linhasA; j++) {
            linha.push(MatrizA[j][i]);
            passos.push(`Aᵀ[${i+1}][${j+1}] = A[${j+1}][${i+1}] = ${MatrizA[j][i].toFixed(2)}`);
        }
        transposta.push(linha);
    }

    exibirResultado('TRANSPOSTA — Aᵀ', passos, transposta);
    return transposta;
}
function calcularTranspostaSilenciosa(matriz, linhas, colunas) {
    const transposta = [];
    for (let i = 0; i < colunas; i++) {
        const linha = [];
        for (let j = 0; j < linhas; j++) {
            linha.push(matriz[j][i]);
        }
        transposta.push(linha);
    }
    return transposta;
}
function calcularProdutoAAT() {
    const { linhasA, colunasA } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const transposta = calcularTranspostaSilenciosa(MatrizA, linhasA, colunasA);
    const matrizAAT = [];

    const passos = [];
    passos.push(`Matriz A (${linhasA}x${colunasA}):`);
    passos.push(matrizParaTexto(MatrizA));
    passos.push(`Matriz Aᵀ (${colunasA}x${linhasA}):`);
    passos.push(matrizParaTexto(transposta));
    passos.push(`Regra: (A x Aᵀ)[i][j] = soma de A[i][k] * Aᵀ[k][j]`);

    for (let i = 0; i < linhasA; i++) {
        const linha = [];
        for (let j = 0; j < linhasA; j++) {
            let soma = 0;
            let contas = [];
            for (let k = 0; k < colunasA; k++) {
                const produto = MatrizA[i][k] * transposta[k][j];
                contas.push(`${MatrizA[i][k]}×${transposta[k][j]}`);
                soma += produto;
            }
            passos.push(`C[${i+1}][${j+1}] = ${contas.join(' + ')} = ${soma.toFixed(2)}`);
            linha.push(soma);
        }
        matrizAAT.push(linha);
    }

    exibirResultado('PRODUTO — A x Aᵀ', passos, matrizAAT);
    return matrizAAT;
}
function calcularProdutoAtA() {
    const { linhasA, colunasA } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const transposta = calcularTranspostaSilenciosa(MatrizA, linhasA, colunasA);
    const matrizAtA = [];

    const passos = [];
    passos.push(`Matriz A (${linhasA}x${colunasA}):`);
    passos.push(matrizParaTexto(MatrizA));
    passos.push(`Matriz Aᵀ (${colunasA}x${linhasA}):`);
    passos.push(matrizParaTexto(transposta));
    passos.push(`Regra: (Aᵀ x A)[i][j] = soma de Aᵀ[i][k] * A[k][j]`);

    for (let i = 0; i < colunasA; i++){
        const linha = [];
        for (let j = 0; j < colunasA; j++){
            let soma = 0;
            let contas = [];
            for (let k = 0; k < linhasA; k++){
                const produto = transposta[i][k] * MatrizA[k][j];
                contas.push(`${transposta[i][k]}×${MatrizA[k][j]}`);
                soma += produto;
            }
            passos.push(`C[${i+1}][${j+1}] = ${contas.join(' + ')} = ${soma.toFixed(2)}`);
            linha.push(soma);
        }
        matrizAtA.push(linha);
    }

    exibirResultado('PRODUTO — Aᵀ x A', passos, matrizAtA);
    return matrizAtA;
}
function calcularMultEscalar() {
    const { linhasA, colunasA } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const valorK = parseFloat(document.getElementById('inputEscalar').value);
    const matrizMultEscalar = [];

    const passos = [];
    passos.push(`Matriz A (${linhasA}x${colunasA}):`);
    passos.push(matrizParaTexto(MatrizA));
    passos.push(`k = ${valorK}`);
    passos.push(`Regra: (k·A)[i][j] = k * A[i][j]`);

    for (let i = 0; i < linhasA; i++){
        const linha = [];
        for (let j = 0; j < colunasA; j++){
            const mult = MatrizA[i][j] * valorK;
            passos.push(`C[${i+1}][${j+1}] = ${valorK} × ${MatrizA[i][j]} = ${mult.toFixed(2)}`);
            linha.push(mult);
        }
        matrizMultEscalar.push(linha);
    }

    exibirResultado(`MULT. ESCALAR — ${valorK}·A`, passos, matrizMultEscalar);
    return matrizMultEscalar;
}
function calcularAdicao() {
    const { linhasA, colunasA, linhasB, colunasB } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const MatrizB = lerMatriz('B', linhasB, colunasB);
    const matrizSoma = [];

    if (linhasA !== linhasB || colunasA !== colunasB) {
        alert('As matrizes devem ser da mesma dimensão');
        return;
    }

    const passos = [];
    passos.push(`Matriz A (${linhasA}x${colunasA}):`);
    passos.push(matrizParaTexto(MatrizA));
    passos.push(`Matriz B (${linhasB}x${colunasB}):`);
    passos.push(matrizParaTexto(MatrizB));
    passos.push(`Regra: (A + B)[i][j] = A[i][j] + B[i][j]`);

    for (let i = 0; i < linhasA; i++) {
        const linha = [];
        for (let j = 0; j < colunasA; j++) {
            const soma = MatrizA[i][j] + MatrizB[i][j];
            passos.push(`C[${i+1}][${j+1}] = ${MatrizA[i][j]} + ${MatrizB[i][j]} = ${soma.toFixed(2)}`);
            linha.push(soma);
        }
        matrizSoma.push(linha);
    }

    exibirResultado('ADIÇÃO — A + B', passos, matrizSoma);
    return matrizSoma;
}
function calcularSubtracao() {
    const { linhasA, colunasA, linhasB, colunasB } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const MatrizB = lerMatriz('B', linhasB, colunasB);
    const matrizSubtracao = [];

    if (linhasA !== linhasB || colunasA !== colunasB) {
        alert('As matrizes devem ser da mesma dimensão');
        return;
    }

    const passos = [];
    passos.push(`Matriz A (${linhasA}x${colunasA}):`);
    passos.push(matrizParaTexto(MatrizA));
    passos.push(`Matriz B (${linhasB}x${colunasB}):`);
    passos.push(matrizParaTexto(MatrizB));
    passos.push(`Regra: (A - B)[i][j] = A[i][j] - B[i][j]`);

    for (let i = 0; i < linhasA; i++) {
        const linha = [];
        for (let j = 0; j < colunasA; j++) {
            const sub = MatrizA[i][j] - MatrizB[i][j];
            passos.push(`C[${i+1}][${j+1}] = ${MatrizA[i][j]} - ${MatrizB[i][j]} = ${sub.toFixed(2)}`);
            linha.push(sub);
        }
        matrizSubtracao.push(linha);
    }

    exibirResultado('SUBTRAÇÃO — A - B', passos, matrizSubtracao);
    return matrizSubtracao;
}
function calcularMultiplicacaoAB() {
    const { linhasA, colunasA, linhasB, colunasB } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const MatrizB = lerMatriz('B', linhasB, colunasB);
    const matrizMultAB = [];

    if (colunasA !== linhasB) {
        alert('As colunas da Matriz A devem ter dimensão igual às linhas da Matriz B');
        return;
    }

    const passos = [];
    passos.push(`Matriz A (${linhasA}x${colunasA}):`);
    passos.push(matrizParaTexto(MatrizA));
    passos.push(`Matriz B (${linhasB}x${colunasB}):`);
    passos.push(matrizParaTexto(MatrizB));
    passos.push(`Regra: (A x B)[i][j] = soma de A[i][k] * B[k][j]`);

    for (let i = 0; i < linhasA; i++) {
        const linha = [];
        for (let j = 0; j < colunasB; j++) {
            let soma = 0;
            let contas = [];
            for (let k = 0; k < colunasA; k++) {
                contas.push(`${MatrizA[i][k]}×${MatrizB[k][j]}`);
                soma += MatrizA[i][k] * MatrizB[k][j];
            }
            passos.push(`C[${i+1}][${j+1}] = ${contas.join(' + ')} = ${soma.toFixed(2)}`);
            linha.push(soma);
        }
        matrizMultAB.push(linha);
    }

    exibirResultado('MULTIPLICAÇÃO — A x B', passos, matrizMultAB);
    return matrizMultAB;
}
function calcularMultiplicacaoBA() {
    const { linhasA, colunasA, linhasB, colunasB } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);
    const MatrizB = lerMatriz('B', linhasB, colunasB);
    const matrizMultBA = [];

    if (colunasB !== linhasA) {
        alert('As colunas da Matriz B devem ter dimensão igual às linhas da Matriz A');
        return;
    }

    const passos = [];
    passos.push(`Matriz B (${linhasB}x${colunasB}):`);
    passos.push(matrizParaTexto(MatrizB));
    passos.push(`Matriz A (${linhasA}x${colunasA}):`);
    passos.push(matrizParaTexto(MatrizA));
    passos.push(`Regra: (B x A)[i][j] = soma de B[i][k] * A[k][j]`);

    for (let i = 0; i < linhasB; i++) {
        const linha = [];
        for (let j = 0; j < colunasA; j++) {
            let soma = 0;
            let contas = [];
            for (let k = 0; k < colunasB; k++) {
                contas.push(`${MatrizB[i][k]}×${MatrizA[k][j]}`);
                soma += MatrizB[i][k] * MatrizA[k][j];
            }
            passos.push(`C[${i+1}][${j+1}] = ${contas.join(' + ')} = ${soma.toFixed(2)}`);
            linha.push(soma);
        }
        matrizMultBA.push(linha);
    }

    exibirResultado('MULTIPLICAÇÃO — B x A', passos, matrizMultBA);
    return matrizMultBA;
}

function subMatriz(matriz, linhaRemover, colunaRemover) {
    const resultado = [];

    for (let i = 0; i < matriz.length; i++) {
        if (i === linhaRemover) continue;

        const linha = [];
        for (let j = 0; j < matriz[i].length; j++) {
            if (j === colunaRemover) continue;
            linha.push(matriz[i][j]);
        }
        resultado.push(linha);
    }

    return resultado;
}

function determinante(matriz) {
    if (matriz.length === 1) {
        return matriz[0][0];
    }

    if (matriz.length === 2) {
        return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
    }

    let det = 0;
    for (let j = 0; j < matriz.length; j++) {
        const sinal = (-1) ** j;
        const sub = subMatriz(matriz, 0, j);
        det += sinal * matriz[0][j] * determinante(sub);
    }
    return det;
}
function calcularDeterminante() {
    const { linhasA, colunasA } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);

    if (linhasA !== colunasA) {
        alert('O número de colunas e de linhas da Matriz devem ser iguais');
        return;
    }

    const passos = [];
    passos.push(`Matriz A (${linhasA}x${colunasA}):`);
    passos.push(matrizParaTexto(MatrizA));
    passos.push(`Cálculo por expansão de Laplace (cofatores da primeira linha):`);

    const det = determinante(MatrizA);

    if (MatrizA.length === 2) {
        passos.push(`det(A) = (${MatrizA[0][0]}×${MatrizA[1][1]}) - (${MatrizA[0][1]}×${MatrizA[1][0]}) = ${det.toFixed(2)}`);
    } else {
        for (let j = 0; j < MatrizA.length; j++) {
            const sinal = (-1) ** j;
            const sub = subMatriz(MatrizA, 0, j);
            const detSub = determinante(sub);
            passos.push(`+ (${sinal === 1 ? '+' : '-'}${MatrizA[0][j]}) × det(submatriz removendo linha 1, coluna ${j+1}) = ${(sinal*MatrizA[0][j]).toFixed(2)} × ${detSub.toFixed(2)}`);
        }
        passos.push(`det(A) = ${det.toFixed(2)}`);
    }

    exibirResultado('DETERMINANTE — det(A)', passos, det);
    return det;
}
function matrizCofatores(matriz) {
    const cofatores = [];

    for (let i = 0; i < matriz.length; i++) {
        const linha = [];
        for (let j = 0; j < matriz.length; j++) {
            const sinal = (-1) ** (i + j);
            const sub = subMatriz(matriz, i, j);
            linha.push(sinal * determinante(sub));
        }
        cofatores.push(linha);
    }

    return cofatores;
}
function calcularInversa() {
    const { linhasA, colunasA } = getDimensoes();
    const MatrizA = lerMatriz('A', linhasA, colunasA);

    if (linhasA !== colunasA) {
        alert('A matriz deve ser quadrada!');
        return;
    }

    const det = determinante(MatrizA);

    if (det === 0) {
        alert('Determinante é 0, a matriz não tem inversa!');
        return;
    }

    const cofatores = matrizCofatores(MatrizA);
    const adjunta = calcularTranspostaSilenciosa(cofatores, cofatores.length, cofatores.length);

    const inversa = [];
    for (let i = 0; i < adjunta.length; i++) {
        const linha = [];
        for (let j = 0; j < adjunta.length; j++) {
            linha.push(adjunta[i][j] * (1 / det));
        }
        inversa.push(linha);
    }

    const passos = [];
    passos.push(`Matriz A (${linhasA}x${colunasA}):`);
    passos.push(matrizParaTexto(MatrizA));
    passos.push(`det(A) = ${det.toFixed(2)}`);
    passos.push(`Matriz de Cofatores:`);
    passos.push(matrizParaTexto(cofatores));
    passos.push(`Adjunta (transposta dos cofatores):`);
    passos.push(matrizParaTexto(adjunta));
    passos.push(`A⁻¹ = (1/det) × Adjunta = (1/${det.toFixed(2)}) × Adjunta`);

    exibirResultado('INVERSA — A⁻¹', passos, inversa);
    return inversa;
}

//imprimir resultado

//trasnforma a matriz em texto
function matrizParaTexto(matriz) {
    if (typeof matriz === 'number') {
        return matriz.toFixed(2);
    }

    let texto = '';
    for (let i = 0; i < matriz.length; i++) {
        texto += matriz[i].map(v => v.toFixed(2)).join('\t') + '\n';
    }
    return texto;
}
function exibirResultado(titulo, passos, resultado) {
    const divPasso = document.getElementById('divPassoAPasso');
    const divResultado = document.getElementById('divResultadoFinal');

    document.getElementById('sectionResultado').style.display = 'block'; // adiciona essa linha

    let htmlPassos = `<h3>${titulo}</h3>`;
    passos.forEach(function(passo) {
        htmlPassos += `<p>${passo}</p>`;
    });

    divPasso.innerHTML = htmlPassos;
    divResultado.innerHTML = `<h3>RESULTADO</h3><pre>${matrizParaTexto(resultado)}</pre>`;

    document.getElementById('btnExportar').style.display = 'block';

    window.resultadoAtual = `${titulo}\n\n${passos.join('\n')}\n\nRESULTADO:\n${matrizParaTexto(resultado)}`;
}

document.getElementById('btnExportar').addEventListener('click', function() {
    const blob = new Blob([window.resultadoAtual], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'resultado-matriz.txt';
    link.click();

    URL.revokeObjectURL(url);
});