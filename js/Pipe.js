function Pipe(){
    // 随机上管子高
    this.shangpipe = parseInt(Math.random()*300)+100;
    // 上下管子之间的距离
    this.gap = 200;
    // 下管子的高度
    this.xiapipe =700-200-this.shangpipe;
    // 自己的位置
    this.x = canvas.width;
   
    
    this.x1 = this.x;
    this.x2 = this.x + 88;
    this.y1 = this.shangpipe;                  // y1就是上管子高
    this.y2 = this.shangpipe+ this.gap;       // y2是上管子高加缝隙
    // 添加个标记是否被得分过
    this.allReadyScore = false;
    pipeArr.push(this);
}

Pipe.prototype.render = function () {
    // 画上管子
   game. ctx.drawImage(game.R['pipe2'], 0, 506 -  this.shangpipe, 88,  this.shangpipe,  this.x, 0, 88,  this.shangpipe);
    // 画下管子
    game. ctx.drawImage(game.R['pipe1'], 0, 0, 88, this.xiapipe, this.x,  this.shangpipe+200, 88, this.xiapipe);
}
Pipe.prototype.update = function () {
    this.x -= 2;
    if (this.x < -88) {
        for (var i = 0; i < pipeArr.length; i++) {
            if (pipeArr[i] == this) {
                pipeArr.splice(i, 1);
            }
        }
    }
    
    this.x1 = this.x;
    this.x2 = this.x + 88;
    this.y1 = this.shangpipe;                  // y1就是上管子高
    this.y2 = this.shangpipe+ this.gap;       // y2是上管子高加缝隙
    if (
        (this.y1 > game.bird.y1 && this.x1 < game.bird.x2 && this.x2 > game.bird.x1)
        ||
        (this.y2 < game.bird.y2 && this.x1 < game.bird.x2 && this.x2 > game.bird.x1)
    ) {
        console.log('撞鸡了！');
      game.gameover();
}
   if(!this.allReadyScore && game.bird.x1 > this.x2) {
    // 加分
    game.score++;
    // 自己标记变脏
    this.allReadyScore = true;
}
}
