"use strict"
class gamePiece{
    constructor (posX, posY, size){
        this.posX=posX;
        this.posY=posY;
        this.size=size;
        this.player = 0;
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
    getPlayer(){
        return this.player;
    }
    setPlayer(player){
        this.player=player;
    }
    isSet(){
        if(this.player!=0){
            return true;
        }
        else return false;
    }

    draw() { //Carga y dibuja todas las imagenes en la matriz

        let posX=this.getPosX();
        let posY=this.getPosY();
        let size=this.size;
        switch (this.getPlayer()) {
            case 1:
                let img1=new Image();
                img1.src=document.getElementById("fichaRoja").src;
                //img1.onload = function(){
                ctx.drawImage(img1,posX+9,posY+10,size,size);
                //}
                
                break;
        
            case 2:
                let img2=document.createElement('img');
                img2.src=document.getElementById("fichaVerde").src;
                //img2.onload = function(){
                    ctx.drawImage(img2,posX,posY,80,80);// acomodo los valores para que calse bien
                                                                      // hay que corregir  
                //}
                
                break;
            default:
                break;
        }

       
    }
}