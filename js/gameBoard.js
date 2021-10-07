"use strict";

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
//let juego =[];
class gameBoard {
    constructor(x,y) {
        this.maxX = x;
        this.maxY = y;
        this.board = [ ];
        this.size=(width/x);

    }
        
    buildBoard(){ //construye la matriz board[][], en cada posicion instancia
                           // un box y ejecuta el draw del objeto box.
                           // Tendriamos que ver de hacer que board tambien sea un objeto asi lo podemos
                           // instanciar con otras medidas como piden extra.
    
        for ( let i=0; i< this.maxX; i++ ) {
            this.board[i] = [];
        
            for ( let j=0; j<this.maxY; j++){
                this.board[i][j] = new box (i*this.size,j*this.size,this.size)
                this.board[i][j].draw();
            }
        }
        
    }

    drawTokens() {
        for ( let i=0; i< this.maxX; i++ ) {    
            for ( let j=0; j<maxY; j++){
                this.board[i][j].token.draw();
            }
        }
    }

    verifyLine(board, lastMoveX, lastMoveY){
        let verifyVertical = verifyVertical(board, lastMoveX);
        let verifyHorizontal = verifyHorizontal(board, lastMoveY);
        let verifyDiagonal = verifyDiagonal(board, lastMoveX, lastMoveY);
    
        if (verifyVertical==true ||verifyHorizontal==true || verifyDiagonal==true)
        return true;
        else
        return false;
        
    }
    
    verifyVertical(board, lastMoveX){
        let x = lastMoveX;
        let line = [];
        let isLine = false
           for (let y = 0; y < maxY; y++) {
            line.push(board[x][y]);
           }
    
        return isLine(line);
    }
    
    verifyHorizontal(board, lastMoveY){
        let y = lastMoveY;
        let line = [];
        let isLine = false
           for (let x = 0; x < maxX; x++) {
            line.push(board[x][y]);
           }
    
        return isLine(line);
    }
    
    verifyDiagonal(board, lastMoveX, lastMoveY) {
        let x = 0;
        let y = 0;
        let line = [];
    
        if (lastMoveX<lastMoveY) {
            y = lastMoveY - lastMoveX;
        }
        else if (lastMoveX>lastMoveY) {
            x = lastMoveX - lastMoveY;
        }
    
        for (let i = 0; x+i < maxX && y+i <maxY; i++) {
            line.push(board[x+i][y+i]);
        }
    
        if (isLine(line)) {
            return true;
        }
        else line = [];
    
        if ((lastMoveX+lastMoveY)>=maxX) {
            x = maxX-1;
            y = (lastMoveX+lastMoveY) - maxX-1;
        }
    
        for (let i = 0; x-i > 0 && y+i <maxY; i++) {
            line.push(board[x-i][y+i]);
            }
    
        if (isLine(line)) {
            return true;
        }
        else return false;
    }
    
    isLine(line) {
        let samePieces = 0;
        for (let i = 0; i < line.length-1; i++) {
            if(line[i].player == line[i+1].player){
                samePieces++;
            }
            else samePieces = 0;
            if (samePieces == 4){
                return true;
            };
        }
        return false;
    }
    
}



let game=new gameBoard(7,6);
game.buildBoard();  // construye el tablero
// board[0][5].token.setPlayer(2);
// board[0][4].token.setPlayer(1);
// board[1][5].token.setPlayer(2);
// board[3][5].token.setPlayer(1);

//drawTokens();