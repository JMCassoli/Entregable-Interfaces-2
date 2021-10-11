"use strict";
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let block = width/4;

let win=false;
let turn=0;
let player= (turn%2)+1;
let game=new gameBoard(7,6);
game.buildBoard();  // construye el tablero

game.drawTokens();
let lastMoveX=0;
console.log(game.verifyLine(lastMoveX,game.getLastMoveY(lastMoveX)));