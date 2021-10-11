"use strict";


//let juego =[];
class gameBoard {
    constructor(x,y) {
        this.maxX = x;
        this.maxY = y;
        this.board = [ ];
        this.size=80;
        this.dropboxX=block;
        this.dropboxMaxX=block+(this.size*x);
        this.dropboxY=this.size;
        this.dropboxMaxY=this.size*2;
    }

    isInDropbox(x,y){
        if ((x>this.dropboxX && x<this.dropboxMaxX) && (y>this.dropboxY && y<this.dropboxMaxY)){
            return true;
        }else return false;
    }

    dropboxMove(x){
        let aux =x-this.dropboxX;
        let pos = Math.floor(aux/this.size);
        this.move(1,pos);
        console.log(pos)
    }



    getSize(){
        return this.size;
    }
        
    buildBoard(){ //construye la matriz board[][], en cada posicion instancia
                           // un box y ejecuta el draw del objeto box.
                           // Tendriamos que ver de hacer que board tambien sea un objeto asi lo podemos
                           // instanciar con otras medidas como piden extra.
    
        for ( let i=0; i< this.maxX; i++ ) {
            this.board[i] = [];
        
            for ( let j=0; j<this.maxY; j++){
                this.board[i][j] = new box (((i*this.size)+block),j*this.size,this.size)
                //this.board[i][j].draw();
            }
        }
        
    }

    drawBoard(){
        for ( let i=0; i< this.maxX; i++ ) {
          //  this.board[i] = [];
        
            for ( let j=0; j<this.maxY; j++){
                const thisbox=this.board[i][j]
                   this.board[i][j].draw();
                 
            }
        }
        
    }

    drawTokens() {
        for ( let i=0; i< this.maxX; i++ ) {    
            for ( let j=0; j<this.maxY; j++){
                this.board[i][j].token.draw();
            }
        }
    }

    move(player, lastmoveX){
        let place=0;
        for(let i=0;i<this.maxY;i++){
            let seted = false;
            seted=this.board[lastmoveX][i].token.isSet();
            if(seted&&i==0){
                break;
            }
            else if(seted){
                place=i-1;
                break;
            }
            else if(i==this.maxY-1){
                place=i;
            }
        }
        this.board[lastmoveX][place].token.setPlayer(player);
    }

    getLastMoveY(lastmoveX){
        let place=0;
        let seted = false;
        for(let i=0;i<this.maxY;i++){
            seted=this.board[lastmoveX][i].token.isSet();
             if(seted){
                place=i;
                break;
            }
            else if(i==this.maxY-1){
                place=i;
            }
        }
        return place;
    }



     //<------------------------------------------ line verification --------------------------------->



    
    verifyLine(lastMoveX, lastMoveY){
        let ver = false;
        let hor = false;
        let dia = false;
        ver = this.verifyVertical(lastMoveX);
        hor = this.verifyHorizontal(lastMoveY);
        dia = this.verifyDiagonal(lastMoveX, lastMoveY);
    
        if (ver==true ||hor==true || dia==true)
        return true;
        else
        return false;
        
    }
    
    verifyVertical(lastMoveX){
        let x = lastMoveX;
        let line = [];
        let isLine = false
           for (let y = 0; y < this.maxY; y++) {
            line.push(this.board[x][y]);
           }
           isLine=this.isLine(line);
           return isLine;
    }
    
    verifyHorizontal(lastMoveY){
        let y = lastMoveY;
        let line = [];
        let isLine = false
           for (let x = 0; x < this.maxX; x++) {
            line.push(this.board[x][y]);
           }
           isLine=this.isLine(line);        
           return isLine;
    }
    
    verifyDiagonal(lastMoveX, lastMoveY) {
        let x = 0;
        let y = 0;
        let line = [];
    
        if (lastMoveX<lastMoveY) {
            y = lastMoveY - lastMoveX;
        }
        else if (lastMoveX>lastMoveY) {
            x = lastMoveX - lastMoveY;
        }

        for (let i = 0; x+i < this.maxX && y+i < this.maxY; i++) {
            line.push(this.board[x+i][y+i]);
        }
    
        if (this.isLine(line)) {
            return true;
        }
        else line = [];

        if ((lastMoveX+lastMoveY)>=this.maxX) {
            x = this.maxX-1;
            y = (lastMoveX+lastMoveY) - this.maxX-1;
        }
        else{
            x = lastMoveX+lastMoveY;
            y = 0;
        }
        
        for (let i = 0; x-i >= 0 && y+i <this.maxY; i++) {
            line.push(this.board[x-i][y+i]);
            }
    
        if (this.isLine(line)) {           
            return true;
        }
        
        else {
            return false;
        }
        }
    
    isLine(line) {
        let samePieces = 0;
        for (let i = 0; i < line.length-1; i++) {
            
            if(line[i].token.player ==0){
                samePieces=0;
            }
            else{
 
                if(line[i].token.player == line[i+1].token.player){
                    samePieces++;
                }
                else samePieces = 0;
                if (samePieces == 3){
                    return true;
                };
            }
        }
        
        return false;
    }
    
}


