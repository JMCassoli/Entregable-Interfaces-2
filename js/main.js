"use strict";
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let block = width/4;
let seconds = 300;
let game=null;
let timer=null;
let win=false;
let turn=0;
let player= (turn%2)+1;
let mode=4;
let token1 = document.getElementById("FichaAzul");
let token2 = document.getElementById("FichaRoja");
let clock = document.getElementById("time");
let btnStart = document.getElementById("start");
btnStart.addEventListener("click",start);
let btnRestart = document.getElementById("restart");
btnRestart.addEventListener("click", reloadPage);
let infoMode = document.getElementById("infoMode");
let btnMode4 = document.getElementById("mode4");
btnMode4.addEventListener("click", function () {mode=4; updateInfoMode()});
let btnMode5 = document.getElementById("mode5");
btnMode5.addEventListener("click", function () {mode=5; updateInfoMode()});
let btnMode6 = document.getElementById("mode6");
btnMode6.addEventListener("click", function () {mode=6; updateInfoMode()});
let slcGreen = document.getElementById("selectGreen");
slcGreen.addEventListener("click", function () {token1=document.getElementById("FichaVerde");});
let slcBlue = document.getElementById("selectBlue");
slcBlue.addEventListener("click", function () {token1=document.getElementById("FichaAzul");});
let slcRed = document.getElementById("selectRed");
slcRed.addEventListener("click", function () {token2=document.getElementById("FichaRoja1");});
let slcYellow = document.getElementById("selectYellow");
slcYellow.addEventListener("click", function () {token2=document.getElementById("FichaAmarilla");});


function start(){
    btnMode4.classList.toggle("nonClickable");
    btnMode5.classList.toggle("nonClickable");
    btnMode6.classList.toggle("nonClickable");
    slcGreen.classList.toggle("nonClickable");
    slcBlue.classList.toggle("nonClickable");
    slcYellow.classList.toggle("nonClickable");
    slcRed.classList.toggle("nonClickable");
    switch (mode) {
        case 6:
            columns=9;
            rows=8;
            piecesGamer(1,765,45,token1,42); // cargo en un arreglo las fichas del jugador 1
            piecesGamer(2,765,1280,token2,42); 
            break;
    
        case 5:
            columns=8;
            rows=7;
            piecesGamer(1,685,45,token1,42); // cargo en un arreglo las fichas del jugador 1
            piecesGamer(2,685,1280,token2,42); 
            break;
        default:
            columns=7;
            rows=6;
            piecesGamer(1,605,45,token1,42); // cargo en un arreglo las fichas del jugador 1
            piecesGamer(2,605,1080,token2,42);   
        break;
    }
   
    
    game=new gameBoard(columns,rows);
    game.buildBoard(); 
    drawFig();
    btnStart.className = "hidden";
    btnRestart.classList.remove("hidden");
    document.getElementById("turn").toggleAttribute("class");
    document.getElementById("timer").toggleAttribute("class");
    timer=setInterval(updateTime,1000);
}

function reloadPage() {
    location.reload();
}

function updateTime() {
    seconds--;
    if (seconds==0){
        document.getElementById("info").innerHTML = "<h1>EMPATE TODOS GANAN!!!</h1>"
        game.finish();
    }
    if(seconds%60<10){
        clock.innerHTML = Math.floor(seconds / 60) + ":0" + seconds % 60;
    }
    else{
        clock.innerHTML = Math.floor(seconds / 60) + ":" + seconds % 60;
    }
}

function updateInfoMode(){
    infoMode.innerHTML= "Modo "+ mode  +" en linea:"
}

// let game=new gameBoard(7,6);
// game.buildBoard();  // construye el tablero

// game.drawTokens();
// let lastMoveX=0;
