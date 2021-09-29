"use strict";
let canvas = document.getElementById('canvasPaint');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let board =  [ ];
//let juego =[];
let maxX = 7;
let maxY = 6;
let size=(width/maxX);



class Figure{
    constructor (posX, posY, fill, context){
        this.posX=posX;
        this.posY=posY;
        this.fill=fill;
        this.context=context;
       
    }

    setFill(fill){
        this.fill=fill;
    }

    getPosition(){
        return{
            x:this.getPosX(),
            y:this.getPosY()
        }
    };
    getPosX(){
        return this.posX();
    }
    getPosY(){
        return this.posY();
    }

    getFill(){
        return this.fill;
    }

draw(){
   ctx.fillStyle=this.fill;
 
    }

}

class Circle extends Figure{
constructor (posX, posY, radius, fill, context) {
    super(posX, posY, fill, context);
    this.radius=radius;
    this.gamer=0; 

}

draw(){
    ctx.fillStyle= super.draw();
    console.log("fillStyle", this.fillStyle)
    ctx.beginPath();
    ctx.arc(this.posX,this.posY, this.radius, 0,2*Math.PI);
    ctx.fill();
    console.log("circulito","POSX",this.posX, "POSY", this.posY, "RADIO" , this.radius, "FILLsTYLE", this.fillStyle);
    ctx.closePath(); 
    };

getRadius(){
    return this.radius();
    };
}

class Box extends Figure{
    constructor (posX, posY, side1,side2, fill, context) {
        super(posX, posY, fill, context);
        this.side1=side1;
        this.side2=side2
       
    }
    
    draw(){
        ctx.fillStyle= super.draw();
        ctx.beginPath();
      //  ctx.strokeRect(this.posX, this.posY, this.side1, this.side2);
        ctx.fillRect(this.posX, this.posY, this.side1, this.side2);
        console.log("cuadradito","POSX",this.posX, "POSY", this.posY, "Lado1" , this.side1,"Lado2" , this.side2, "FILLsTYLE", this.fillStyle);
        //ctx.closePath(); 
        };
    
    getSide1(){
        return this.Side1();
        };

        getSide2(){
            return this.Side2();
            };
    }





function buildBoard(){

    //ctx.fillStyle="#0000FF"; // aca
    //ctx.fillRect(0,0,width, height);
    for ( var i=0; i< maxX; i++ ) {
        board[i] = [];
    
        for ( var j=0; j<maxY; j++){


            board[i][j] = new Box(i*size,j*size,size,size,"#0000FF",ctx);
            board[i][j].draw();
            //board[i][j] = new Circle(((i)*size + size/2),((j)* size + size/2),size /2.2,"#FF0000",ctx);
          
           

        }
    }
}

function drawBoard(){

    for ( var i=0; i< maxX; i++ ) {
       // board[i] = [];
    
        for ( var j=0; j<maxY; j++){

            board[i][j] = new Circle(((i)*size + size/2),((j)* size + size/2),size /2.2,"#FF0000",ctx);
            board[i][j].draw();
           

        }
    }
};

function gamePiece(){

}

/* var circulito = new Circle(150,150,125,"#00FF45",ctx);
circulito.draw();
var cuadradito = new Rect(150,150,200,200, "#FFFF00",ctx);
cuadradito.draw(); */
buildBoard();
drawBoard();

function verifyLine(board, lastMoveX, lastMoveY){
    let verifyVertical = verifyVertical(board, lastMoveX);
    let verifyHorizontal = verifyHorizontal(board, lastMoveY);
    let verifyDiagonal = verifyDiagonal(board, lastMoveX, lastMoveY);

    if (verifyVertical==true ||verifyHorizontal==true || verifyDiagonal==true)
    return true;
    else
    return false;
    
}

function verifyVertical(board, lastMoveX){
    let x = lastMoveX;
    let line = [];
    let isLine = false
       for (let y = 0; y < maxY; y++) {
        line.push(board[x][y]);
       }

    return isLine(line);
}

function verifyHorizontal(board, lastMoveY){
    let y = lastMoveY;
    let line = [];
    let isLine = false
       for (let x = 0; x < maxX; x++) {
        line.push(board[x][y]);
       }

    return isLine(line);
}

function verifyDiagonal(board, lastMoveX, lastMoveY) {
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

function isLine(line) {
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
