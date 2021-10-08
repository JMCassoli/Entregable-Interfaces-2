"use strict";
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

let game=new gameBoard(7,6);
game.buildBoard();  // construye el tablero
game.move(1,0);
game.move(2,0);
game.move(1,0);
game.move(2,0);
game.move(1,0);
game.drawTokens();
console.log(game.verifyLine(0,0));