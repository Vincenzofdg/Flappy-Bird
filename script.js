console.log('Flappy Bird - unofficial');

const sprites = new Image();
sprites.src = './sprites.png';

const soundHit = new Audio();
soundHit.src = './sound/hit.wav'

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d') // Jogo será em 2D


// Personagem:
const bird = {
  sprX: 0,
  sprY: 0,
  largura: 34,
  altura: 24,
  x: 10,
  y: 50,
  pulo: 4.5,
  gravidade: 0.20,
  velocidade: 0,
  pula() {
    bird.velocidade = -(bird.pulo);
  },
  atualiza() {
    if (colide(bird, chao)) {
      soundHit.play();
      setTimeout(() => {
        mudaTela(tela.start)
        bird.x = 10;
        bird.y = 50;
        bird.velocidade = 0;
      }, 450);
      return;
    };
    bird.velocidade += bird.gravidade,
      bird.y += bird.velocidade
  },
  desenha() {
    context.drawImage(
      sprites,
      bird.sprX, bird.sprY, // Sprite x, Sprite Y
      bird.largura, bird.altura, // Tamanho do recorte na Sprite.png (valores pegos pelo Gimp)
      bird.x, bird.y, // Posição X e Y dentro do Canvas
      bird.largura, bird.altura, // Tamanho do Sprite dentro do Canvas
    );
  }
}

const colide = (personagem, local) => {
  const colided = local.y - bird.altura
  if (personagem.y >= colided) return true;
  return false;
};

// Tela de Inicio:
const mensagemInicio = {
  sprX: 134,
  sprY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - (172 / 2),
  y: 40,
  desenha() {
    context.drawImage(
      sprites,
      mensagemInicio.sprX, mensagemInicio.sprY,
      mensagemInicio.largura, mensagemInicio.altura,
      mensagemInicio.x, mensagemInicio.y,
      mensagemInicio.largura, mensagemInicio.altura,
    );
  }
}

// Chão:
const chao = {
  sprX: 0,
  sprY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenha() {
    context.drawImage(
      sprites,
      chao.sprX, chao.sprY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    // Completa o chao:
    context.drawImage(
      sprites,
      chao.sprX, chao.sprY,
      chao.largura, chao.altura,
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura,
    );
  }
}

// Background:
const planoDeFundo = {
  sprX: 390,
  sprY: 0,
  largura: 276,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    // area de fundo:
    context.fillStyle = '#70c5ce'; // Do Jogo
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.drawImage(
      sprites,
      planoDeFundo.sprX, planoDeFundo.sprY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    // Completa o plano de fundo:
    context.drawImage(
      sprites,
      planoDeFundo.sprX, planoDeFundo.sprY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  }
}

// Telas:
let telaAtiva = {};

function mudaTela(novaTela) {
  telaAtiva = novaTela;
}

const tela = {
  start: {
    desenha() {
      planoDeFundo.desenha();
      chao.desenha();
      bird.desenha()
      mensagemInicio.desenha();
    },
    click() {
      mudaTela(tela.game);
    },
    atualiza() {

    }
  },
  game: {
    desenha() {
      planoDeFundo.desenha();
      chao.desenha();
      bird.desenha()
    },
    click() {
      bird.pula();
    },
    atualiza() {
      bird.atualiza();
    }
  }
}

function loop() {
  telaAtiva.desenha(),
    telaAtiva.atualiza();
  requestAnimationFrame(loop);
}

mudaTela(tela.start);
loop();


// Ações:
canvas.addEventListener('click', () => {
  if (telaAtiva.click) telaAtiva.click();
});