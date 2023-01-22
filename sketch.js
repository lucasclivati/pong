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

//sons do jogo
let raquetada, somponto, trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//placar do jogo
let pontos1, pontos2
pontos1 = 0;
pontos2 = 0;
    
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  mostraRaquete(xRaquete,yRaquete);
  movimentarBolinha();
  verificaColisaoBorda();
  bolinhaMeioTela();
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
    raquetada.play();
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raioBolinha < xRaquete + RaqueteComprimento &&
    yBolinha - raioBolinha < yRaquete + RaqueteAltura &&
     yBolinha + raioBolinha > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

function bolinhaMeioTela(){
    if (xBolinha + raioBolinha < 0){
    xBolinha = 300;
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
  //w para subir
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
    //s para subir
    if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255,140,0));
  rect(210,10,40,20);
  fill(255);
  text(pontos1, 230,26);
  fill(color(255,140,0));
  rect(350,10,40,20);
  fill(255);
  text(pontos2, 370,26);
}
function marcaPonto(){
  if (xBolinha > 590){
    pontos1 += 1;
    ponto.play();
  }
    if (xBolinha < 10){
    pontos2 += 1;
    ponto.play();
  }
}
