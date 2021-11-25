
// variaveis de controle de interface
let seuVotopara = document.querySelector('.d1_esquerda_1 span');
let cargo = document.querySelector('.d1_esquerda_2 span');
let descricao = document.querySelector('.d1_esquerda_4');
let aviso = document.querySelector('.d2');
let lateral = document.querySelector('.d1_direita');
let numeros = document.querySelector('.d1_esquerda_3');
let div_button_branco = document.querySelector('.div_btn_branco');




//variaveis de controle de ambiente
let EtapaAtual = 0;
let codigo_candidato = '';
let voto_branco = false;



function comecarEtapa() {
    let etapa = etapas_eleicao[EtapaAtual]

    let voto_branco = false;
    codigo_candidato = '';
    let numeroHtml = '';
    // loop que coloca na tela os campos de acordo com a quantidade de digitos para cada cargo ex: vereador 5 digitos prefeito dois dgts
    for (let i = 0; i < etapa.numeros; i++) {

        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';

        }
        else {
            numeroHtml += '<div class="numero"></div>';

        }

    }
    // inicia a urna clean sem informações
    seuVotopara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}

function atualizaInterface() {
    let etapa = etapas_eleicao[EtapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === codigo_candidato) {
            return true;
        }
        else {
            return false;;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotopara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido:${candidato.partido}`

        let ft_candidato = '';
        for (let i in candidato.fotos) {
            ft_candidato += `<div class="d1_direita_image"><img src="imagens/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
        }
        lateral.innerHTML = ft_candidato;
    }
    else {
        seuVotopara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso_grande ">NÚMERO ERRADO</div> ${'<div class="aviso_grande pisca num">VOTO NULO</div>'}`;
    }
}
// funções dos botoes
function clicou(n) {
    const audio = document.querySelector('audio');
    //pro audio tocar seguido um do outro
    audio.currentTime = 0;
    audio.play();
    // procura no documento um elemento com essas classes
    let digito = document.querySelector('.numero.pisca');
    if (digito !== null) {
        digito.innerHTML = n;
        codigo_candidato = `${codigo_candidato}${n}`;
        // remove uma classe de um elemento
        digito.classList.remove('pisca');
        // acha o proximo elemento
        if (digito.nextElementSibling !== null) {
            digito.nextElementSibling.classList.add('pisca');

        }
        else {
            atualizaInterface();
        }
    }
}

function branco() {
    codigo_candidato = '';
    voto_branco = true;
    seuVotopara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso_muito_grande pisca ">VOTO EM BRANCO</div>'
    lateral.innerHTML = '';
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas_eleicao[EtapaAtual];
    let VotoConfirmado = false;
    if (voto_branco === true) {
        VotoConfirmado = true;
        console.log("voto confirmado BRANCO");


    }
    else if (codigo_candidato.length === etapa.numeros) {
        VotoConfirmado = true;
        console.log("voto confirmado" + codigo_candidato)

    }
    let audio = document.querySelector('audio');
    audio = audio.nextElementSibling;
    audio.play();

    if (VotoConfirmado === true) {
        EtapaAtual++;
        if (etapas_eleicao[EtapaAtual] !== undefined) {
            comecarEtapa();
        }
        else {
            seuVotopara.style.display = 'none';
            cargo.innerHTML = "";
            aviso.style.display = 'none';
            numeros.innerHTML = '';
            descricao.innerHTML = '<div id="fim" class="pisca">FIM</div>';
            div_button_branco.innerHTML = '<button class="teclado_botao btn_branco" onclick="branco()" disabled> BRANCO</button>'

            lateral.innerHTML = '';
        }

    }
}








//chamando funcao
comecarEtapa();