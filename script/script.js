// Guarda os valores do Form em variáveis
const formMatrizA = document.getElementById("formMatrizA");
const selLinhaMatrizA = document.getElementById("selLinhaMatrizA");
const selColunaMatrizA = document.getElementById("selColunaMatrizA");
const divMatrizA = document.getElementById("divMatrizA");

gerarGridMatrizA()

// Adiciona um evento para quando a variável que recebe o select ter o valor alterado
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
            divLinha.appendChild(input);
        }

        divMatrizA.appendChild(divLinha);
    }

}

const btnMatrizB = document.getElementById('btnMatrizB');
const sectionEscolhaMatrizB = document.getElementById('sectionEscolhaMatrizB');
let matrizBAtiva = false;

btnMatrizB.addEventListener("click", toggleMatrizB);

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