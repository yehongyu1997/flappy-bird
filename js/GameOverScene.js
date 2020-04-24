function GameOverScene(){
  this.f=0;
}
GameOverScene.prototype.update =function(){
    this.f++;
    if(this.f<40){
        this.goY = this.f*6  -54;
    }
}
GameOverScene.prototype.render=function(){
    game.ctx.drawImage(game.R['gameover'], game.canvas.width / 2 - 204 / 2, this.goY);
    if(this.f>50){
        game.ctx.drawImage(game.R['btn'], game.canvas.width / 2 - 116 / 2, 280);
    }
}