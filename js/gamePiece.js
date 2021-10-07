class gamePiece{
    constructor (posX, posY){
        this.posX=posX;
        this.posY=posY;
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

    draw() { //Carga y dibuja una imagen en la posicion que recibe por parametro

        let posX=this.getPosX();
        let posY=this.getPosY();

        switch (this.getPlayer()) {
            case 1:
                let img1=document.createElement('img');
                img1.src='img/FichaRoja.png';
                img1.onload = function(){
                    ctx.drawImage(img1,posX+9,posY+10,size-20,size-20);
                }
                
                break;
        
            case 2:
                let img2=document.createElement('img');
                img2.src='img/FichaAmarilla.png';
                img2.onload = function(){
                    ctx.drawImage(img2,posX+9,posY+10,size-20,size-20);// acomodo los valores para que calse bien
                                                                      // hay que corregir  
                }
                
                break;
            default:
                break;
        }

       
    }
}