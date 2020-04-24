// 鸟类
function Bird(){
     this.x=100;
     this.y = 100;
     this.r = 0.1;
     this.dy=1;
     this.step= 0;
       // 小鸟自己AABB盒
    this.x1 = this.x - 27;   // this.x是鸟心，而this.x1是小鸟左边线，所以要减去宽度一半
    this.x2 = this.x + 27;
    this.y1 = this.y - 18;          // 小鸟的高度是36,
    this.y2 = this.y + 18;

}
Bird.prototype.render = function(){
    // 这是先把坐标原点移动位置
    game.ctx.save();
      game.ctx.translate(this.x,this.y);
      game.ctx.rotate(this.r);
      game.ctx.drawImage(game.R.bird, 27*this.step, 0, 27, 18,-27, -18, 54, 36);
    // 恢复画布状态
    game.ctx.restore();

}
Bird.prototype.update = function(){
    // 竖直下落
    this.y++;
// 弧度zizeng
    this.r+=0.1;
    // 类似于重力加速度
    this.dy += 0.3;
    // 这里的this.y就相当于一段时间要落下的位移
    this.y += this.dy;

// 根据帧编号来进行小鸟本身翅膀的变化，每3帧就将bird换到下一个形态
    if (game.f % 3 == 0) {
        this.step++;
        // 如果超过2了，那么就拉回来
        if (this.step > 2) {
            this.step = 0;
        }
    }
// 每帧都要更新AABB盒子
    this.x1 = this.x - 27;   
    this.x2 = this.x + 27;
    this.y1 = this.y - 18;          
    this.y2 = this.y + 18;
    // 小鸟落地判断
    if(this.y2>700){
        console.log('落地了');
        game.gameover();
    }
   
}
// 设置一个小鸟飞的类，在点击canvas的时候立即给一个反方向的重力加速度
Bird.prototype.fly= function(){
    // 这里的重力加速度设 的是反方向的8，这样小鸟在点击的时候就会向上飞
    this.dy=-8;
    this.r=-1;
}