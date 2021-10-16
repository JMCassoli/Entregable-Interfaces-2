let figuras = [];
//let size=(width/(15));
let rows=7;
let columns=8;
let isMouseDown=false;
let lastClickedFigure=null;
let oldX=0;
let oldY=0;


canvas.addEventListener('mousedown',onMouseDown,false);
canvas.addEventListener('mouseup',onMouseUp,false);
canvas.addEventListener('mousemove',onMouseMove,false); 

class Circle {
    constructor (posX, posY, radius, fillStyle, context,img,gamer) {
        //super(posX, posY, fill, context);
        this.posX=posX;
        this.posY=posY;
        this.fillStyle=fillStyle;
        this.context=context;
        this.radius=radius;
        this.gamer=gamer; 
        this.img=img;
        
    
    }
    
    

    draw(){

        //clearCanvas();
        ctx.fillStyle=this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.posX,this.posY, this.radius, 0,2*Math.PI);
        //ctx.fill();
        //  ctx.closePath(); 
        
                let posX=this.posX;
                let posY=this.posY;
                let size=this.radius * 2;               
                ctx.drawImage(this.img,posX-(size/2),posY-(size/2),size,size);               
        ctx.closePath();   


    };

    setPosition(newX,newY){
        this.posX=newX;
        this.posY=newY;
    }

    getRadius(){
        return this.radius();
    };

    isPointInside(x,y){
       let X=this.posX-x;
       let Y=this.posY-y;
        return (Math.sqrt(X*X + Y*Y)< this.radius);
    }

}







function clearCanvas(){
    ctx.clearRect(0,0,width,height);
    //game.buildBoard()
}

function findClickedFigure(x,y){
    
    for ( let i=0; i< figuras.length; i++ ) {
        const element = figuras[i];
        //console.log ("Element en FindClickedFigure..",element," i...",i);
        if (element.isPointInside(x,y)){
           return element;
           } 
        }
    return null;
}

function onMouseDown(e){
    isMouseDown=true;
    console.log("inMouseDown",isMouseDown);
    let clickFig=findClickedFigure(e.layerX,e.layerY);
    if ((clickFig != null)&&(clickFig.gamer==player)){
        lastClickedFigure=clickFig; // guardo en   lastClickedFigure la ficha seleccionada
        oldX=clickFig.posX;
        oldY=clickFig.posY;
        //console.log("lastclk",lastClickedFigure,"coordenadas",e.layerX,e.layerY);
    }

}

function onMouseMove(e){
    if (isMouseDown && lastClickedFigure != null){
        //console.log("setposition",e.layerX,e.layerY,"lastClickedFigure...", lastClickedFigure);
        //lastClickedFigure.limpiar();  // aca borro la imagen anterior, para no volver a cargar el canvas
        lastClickedFigure.setPosition(e.layerX,e.layerY);
        //lastClickedFigure.draw();
        drawFig();

      
    };
}

function onMouseUp(e){
    isMouseDown=false;
    //console.log(game.isInDropbox(e.layerX,e.layerY));
    if  (game.isInDropbox(e.layerX,e.layerY)&&(lastClickedFigure!=null)){
        let pos=game.dropboxMove(player,e.layerX);        
        if (pos==-1) {
            lastClickedFigure.setPosition(oldX,oldY)
            drawFig();
        }
        else if(game.verifyLine(pos,game.getLastMoveY(pos))){
            game.win();
        }
        else{
            game.changeTurn();
            deleteFig(lastClickedFigure);
            game.checkTie();
        }
        game.drawTokens();
        drawFig();
        //console.log(player);
    }
    else if((!game.isInDropbox(e.layerX,e.layerY))&&(lastClickedFigure!=null)) {
        lastClickedFigure.setPosition(oldX,oldY)
        drawFig();
        //console.log(turn)
    }
    lastClickedFigure=null;
}

function deleteFig(figure) {

    for ( let i=0; i< figuras.length; i++ ) {
        const element = figuras[i];
        if (element===figure){
            figuras.splice(i,1);
            //figuras[i]=null;
            break;
           } 
        }
}



function drawFig(){
    clearCanvas();
    game.drawBoard();
    game.drawTokens();
    for ( let i=0; i< figuras.length; i++ ) {
        const element = figuras[i];
        //console.log (element);
        //if(element!=null){
            element.draw();
        //}
      }
    
};

function piecesGamer(gamer,posY,posX,img,size){ 
    let posYInic=posY;
    let posXInic=posX;
    let cont=1;
    for ( let i=0; i<((rows* columns)/2); i++){
   
        var ficha=new Circle(posXInic,posYInic,size,"#00FFFF",ctx,img,gamer);
        posXInic = posXInic + 70;
     
        if ((cont%3) == 0){
            posYInic = posYInic - 65;
            posXInic=posX;
        }
        figuras.push(ficha);
        cont++;
    }
// console.log(figuras);
}

// piecesGamer(1,45,document.getElementById("fichaRoja"),35); // cargo en un arreglo las fichas del jugador 1
// piecesGamer(2,1080,document.getElementById("fichaVerde"),42);
// drawFig();