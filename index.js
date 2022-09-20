let numeroAtual = ''
let numeroAnterior = ''
let operador = ''
let arrayNumerosOperador = []
let numeroClicado = false
let operadorClicado = false

const visorGrande = document.querySelector('#visor-grande')
const visorPequeno = document.querySelector('#visor-pequeno')

const botoesNumeros = document.querySelectorAll('.numeros')
const botoesOperadores = document.querySelectorAll('.operadores')
const botaoIgual = document.querySelector('#igual')
const botaoZerar = document.querySelector('#zerar')
const botaoApagar = document.querySelector('#apagar')
const botaoVirgula = document.querySelector('#virgula')

botoesNumeros.forEach(botao => {
    botao.addEventListener('click', () => {
        numeroAtual += botao.innerText
        visorGrande.innerText = numeroAnterior + ' ' + numeroAtual
        visorPequeno.innerText = ''
        numeroClicado = true
    })
});

botoesOperadores.forEach(botao => {
    botao.addEventListener('click', () => {
        if (numeroClicado && arrayNumerosOperador.length < 2) {
            visorGrande.innerText += ' ' + botao.innerText

            numeroAtual = parseFloat(numeroAtual.replace(',', '.'))
            arrayNumerosOperador.push(numeroAtual)
            numeroAtual = ''
            
            operador = botao.id
            arrayNumerosOperador.push(operador)
            
            numeroAnterior = visorGrande.innerText            
            operadorClicado = true
            numeroClicado = false
        }
    })
});

botaoIgual.addEventListener('click', () => {
    if (operadorClicado && numeroClicado) {
        numeroAtual = parseFloat(numeroAtual.replace(',', '.'))
        arrayNumerosOperador.push(numeroAtual)
        visorPequeno.innerText = numeroAnterior + ' ' + numeroAtual
        
        let resultado = 
        operacao(arrayNumerosOperador[0], arrayNumerosOperador[2], arrayNumerosOperador[1])
        
        visorGrande.innerText = Number(resultado.toPrecision(10)).toString().replace('.', ',')
        zerarCalculadora()
    }
})

botaoZerar.addEventListener('click', () => {
    zerarCalculadora()
    visorPequeno.innerText = ''
    visorGrande.innerText = '0'
})

botaoApagar.addEventListener('click', () => {
    numeroAtual = numeroAtual.slice(0, -1)
    visorGrande.innerText = numeroAnterior + ' ' + numeroAtual
    if (numeroAtual === '') {
        numeroClicado = false
    }
})

botaoVirgula.addEventListener('click', (e) => {
    if (!/\,/.test(numeroAtual)) {
        numeroAtual += e.currentTarget.innerText
        visorGrande.innerText = numeroAnterior + ' ' + numeroAtual
    }
})

const operacoes = {
    somar: function (a, b) {
        return a + b
    },
    subtrair: function (a, b) {
        return a - b
    },
    dividir: function (a, b) {
        return a / b
    },
    multiplicar: function (a, b) {
        return a * b
    }
}

function operacao(a, b, operador) {
    return operacoes[operador](a, b)
}

function zerarCalculadora() {
    numeroAtual = ''
    numeroAnterior = ''
    arrayNumerosOperador = []
    numeroClicado = false
    operadorClicado = false
}