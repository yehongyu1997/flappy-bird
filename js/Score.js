function Score(){

}

    Score.prototype.render = function () {
        var score_str = game.score.toString();
        // 如果分数数字是奇数位数（注意，不是分数本身是奇数，是分数的位数是奇数）
        if (score_str.length % 2 == 1) {
            // 计算左基准线，比如是5位数，那么减去2个30，和半个12。
            var baseY = game.canvas.width / 2 - parseInt(score_str.length / 2) * 30 - 12;
    
        } else {
            // 计算左基准线，比如是6位数，那么减去3个30，加上一个3,3是半个缝。
            var baseY = game.canvas.width / 2 - score_str.length / 2 * 30 + 3;
        }
    
        // 渲染每个数位，每个数位都向后递进30
        for (var i = 0; i < score_str.length; i++) {
            game.ctx.drawImage(game.R[score_str[i]], baseY + i * 30, 100);
        }
}