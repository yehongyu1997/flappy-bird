function Bg() {
 
    
}

// 背景的渲染方法
Bg.prototype.render = function () {
    // 绘制两个背景图片，这里的套路和之前jQuery课程中的传统轮播图是一致的。
    game.ctx.drawImage(game.R['bg'], 0, 0,  768, 896, 0, 0, 600, 700);
  
}