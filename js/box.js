
class box{
    constructor (posX, posY,size){
        this.posX=posX;
        this.posY=posY;
        this.size=size;
        this.token= new gamePiece(this.posX,this.posY,this.context);
        this.empty = document.createElement('img');
        this.empty.src='img/casilleroVacio.png';
    }
    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    getContext(){
        return this.context;
    }
    getSize(){
        return this.size;
    }
    
    draw() { //Carga y dibuja una imagen en la posicion del box
        let posX=this.getPosX();
        let posY=this.getPosY();
        let size =this.getSize();
        let empty = this.empty;
        empty.onload= function (){
            ctx.drawImage(empty,posX,posY,size,size);
        };        
    }

}
