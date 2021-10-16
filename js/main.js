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
let clock = document.getElementById("time");
let btnStart = document.getElementById("start").addEventListener("click",start);
let btnRestart = document.getElementById("restart").addEventListener("click", reloadPage);
let btnMode4 = document.getElementById("mode4").addEventListener("click", function () {mode=4});
let btnMode5 = document.getElementById("mode5").addEventListener("click", function () {mode=5});
let btnMode6 = document.getElementById("mode6").addEventListener("click", function () {mode=6});

function start(){
    switch (mode) {
        case 6:
            columns=9;
            rows=8;
            piecesGamer(1,765,45,document.getElementById("fichaRoja"),35); // cargo en un arreglo las fichas del jugador 1
            piecesGamer(2,765,1280,document.getElementById("fichaVerde"),42); 
            break;
    
        case 5:
            columns=8;
            rows=7;
            piecesGamer(1,685,45,document.getElementById("fichaRoja"),35); // cargo en un arreglo las fichas del jugador 1
            piecesGamer(2,685,1280,document.getElementById("fichaVerde"),42); 
            break;
        default:
            columns=7;
            rows=6;
            piecesGamer(1,605,45,document.getElementById("fichaRoja"),35); // cargo en un arreglo las fichas del jugador 1
            piecesGamer(2,605,1080,document.getElementById("fichaVerde"),42);   
        break;
    }
   
    
    game=new gameBoard(columns,rows);
    game.buildBoard(); 
    drawFig();
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

// let game=new gameBoard(7,6);
// game.buildBoard();  // construye el tablero

// game.drawTokens();
// let lastMoveX=0;
