function Pipe(){
    // 随机上管子高
    this.shangpipe = parseInt(Math.random()*300)+100;
    // 上下管子之间的距离
    this.gap = 100;
    // 下管子的高度
    this.xiapipe =700-100-this.shangpipe;
    // 自己的位置
    this.x = canvas.width;
   
    pipeArr.push(this);
}

Pipe.prototype.render = function () {
    // 画上管子
   game. ctx.drawImage(game.R['pipe2'], 0, 506 -  this.shangpipe, 88,  this.shangpipe,  this.x, 0, 88,  this.shangpipe);
    // 画下管子
    game. ctx.drawImage(game.R['pipe1'], 0, 0, 88, this.xiapipe, this.x,  this.shangpipe+100, 88, this.xiapipe);
}
Pipe.prototype.update = function () {
    this.x -= 2;
    if (this.x < -88) {
        for (var i = 0; i < pipeArr.length; i++) {
            if (pipeArr[i] == this) {
                pipeArr.splice(i, 1);
            }
        }
    }}