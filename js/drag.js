let figuras = [];
let size=(width/(15));
let rows=6;
let columns=7;
let isMouseDown=false;
let lastClickedFigure=null;

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
                let img1=new Image();
                img1.src=document.getElementById("fichaRoja").src;
                //img1.onload = function(){
                ctx.drawImage(this.img,posX-(size/2),posY-(size/2),size,size);
               // };
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
        console.log ("Element en FindClickedFigure..",element," i...",i);
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
    console.log("clickfig",clickFig,"lastclk",lastClickedFigure,"coordenadas",e.layerX,e.layerY);
    if (clickFig != null){
        lastClickedFigure=clickFig; // guardo en   lastClickedFigure la ficha seleccionada
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
    lastClickedFigure=null;
}

function drawFig(){
    clearCanvas();
    game.drawBoard();
    game.drawTokens();
    for ( let i=0; i< figuras.length; i++ ) {
        const element = figuras[i];
        console.log (element);
       element.draw();
      }
    
};

function piecesGamer(gamer,posX,img){ 
    let posYInic=800;
    let posXInic=posX;
    let cont=1;
    for ( let i=0; i<((rows/2) * ((columns/2)+1)); i++){
   
        var ficha=new Circle(posXInic,posYInic,20,"#00FFFF",ctx,img,gamer);
        posXInic = posXInic + 50;
     
        if ((cont%4) == 0){
            posYInic = posYInic - 50;
            posXInic=posX;
        
        }
        figuras.push(ficha);
        cont++;
    }
   
   // console.log(figuras);
}

piecesGamer(1,100,document.getElementById("fichaRoja")); // cargo en un arreglo las fichas del jugador 1
piecesGamer(2,block*3,document.getElementById("fichaVerde"));
drawFig(); 