//variveis bolinha
let xBolinha, yBolinha, diametroBolinha, velocidadeXBolinha, velocidadeYBolinha, raioBolinha
xBolinha = 300;
yBolinha = 200;
diametroBolinha = 15;
raioBolinha = diametroBolinha/2;
//variaveis velocidade bolinha
velocidadeXBolinha = 6;
velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete, yRaquete, RaqueteComprimento, RaqueteAltura
xRaquete = 5;
yRaquete = 150;
RaqueteComprimento = 10;
RaqueteAltura = 90;

//variaveis da raquete do oponente
let xRaqueteOponente, yRaqueteOponente, velocidadeYOponente
xRaqueteOponente = 585;
yRaqueteOponente = 150;
velocidadeYOponente = 5;

//variáveis da colisão
let colidiu = false;

//placar do jogo
let pontos1, pontos2
pontos1 = 0;
pontos2 = 0;
    
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  mostraRaquete(xRaquete,yRaquete);
  movimentarBolinha();
  verificaColisaoBorda();
  movimentaRaquete();
  //verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete,yRaquete); // colisao com minha raquete
  colisaoRaqueteBiblioteca(xRaqueteOponente,yRaqueteOponente); // colisao com raquete oponente
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  incluirPlacar();
  marcaPonto();
}

function mostraBolinha (){
  circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentarBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function mostraRaquete(x,y){
  rect(x, y, RaqueteComprimento,RaqueteAltura);
}


function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
    if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function colisaoRaqueteBiblioteca(x,y){
colidiu = collideRectCircle(x,y,RaqueteComprimento,RaqueteAltura,xBolinha,yBolinha,raioBolinha);
  if(colidiu){
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raioBolinha < xRaquete + RaqueteComprimento &&
    yBolinha - raioBolinha < yRaquete + RaqueteAltura &&
     yBolinha + raioBolinha > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoBorda(){
  if(xBolinha + raioBolinha> width || 
     xBolinha - raioBolinha < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raioBolinha> height || 
     yBolinha - raioBolinha < 0){
    velocidadeYBolinha *= -1;
  }
}
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - RaqueteComprimento /2 -30;
  yRaqueteOponente += velocidadeYOponente;
}

function incluirPlacar(){
  textSize(16);
  fill(255);
  text(pontos1, 278,26);
  text(pontos2, 321,26);
}
function marcaPonto(){
  if (xBolinha > 590){
    pontos1 += 1;
  }
    if (xBolinha < 10){
    pontos2 += 1;
  }
}
