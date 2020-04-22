function Land (){
    // 大地类的起点位置
    this.x=0;
    this.y= 700;
}
Land.prototype.render= function(){
    // 我的画布宽度是600，一个大地的宽度是37，所以故意多花了两个，防止穿帮
    for(var i = 0;i<18;i++){
        game.ctx.drawImage(game.R['land'],this.x+37*i,this.y)
    }
      
}
// 更新方法，水平向左平移
Land.prototype.update= function(){
  this.x--;
//   打第一个大地完全消失的时候，立即拉回
  if(this.x<-36){
      this.x=0;
  }
}