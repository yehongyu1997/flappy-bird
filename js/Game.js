//  游戏类
function Game() {
  // 得到画布
  this.canvas = document.getElementById("canvas");
  // 渲染上下文
  this.ctx = this.canvas.getContext("2d");
  // 画布的宽度和高度与视口的宽高一样
  // this.canvas.width = document.documentElement.clientWidth;
  // this.canvas.height = document.documentElement.clientHeight;
  // 定义一个全部图片数组
  var allimages = [
    { url: "images/bird.png", alias: "bird" },
    { url: "images/background.png", alias: "bg" },
    { url: "images/ground.png", alias: "land" },
    { url: "images/pipe1.png", alias: "pipe1" },
    { url: "images/pipe2.png", alias: "pipe2" },
  ];

  //   创建一个空数组来存放加载完的图片
  this.R = [];
  this.ctx.font = "30px 微软雅黑";
  this.ctx.textAlign = "center";
  this.ctx.clearRect(0, 0, 600,800);
  this.ctx.fillText(
    "正在加载图片 " + "0" + "/" + allimages.length,
   300,
   400
  );
  //   备份
  var self = this;
  //   然后遍历这个数组
  for (var i = 0; i < allimages.length; i++) {
    (function (i) {
      // 创建一个图片对象
      var img = new Image();
      img.onload = function () {
        self.R[allimages[i].alias] = this;
        console.log(self.R);
        self.ctx.font = "30px 微软雅黑";
        self.ctx.textAlign = "center";
        self.ctx.clearRect(0, 0, 600, 800);
        self.ctx.fillText(
          "正在加载图片 " + Object.keys(self.R).length + "/" + allimages.length,
         300,
         400
        );
        if (Object.keys(self.R).length == allimages.length) {
          console.log("加载结束");
          self.start();
        }
      };
      img.src = allimages[i].url;
    })(i);
  }
}
// start方法
// 定义一个管子数组
var pipeArr=[];
Game.prototype.start = function () {
  var self = this;
  this.bg = new Bg();
  this.land = new Land();
  new Pipe();
  
  self.f = 0;
//   字体样式
  self.ctx.textAlign='left';
  self.ctx.font='30px 宋体';
//   定时器
  setInterval(function () {
    
    self.f ++;
    // // 每200帧就new一次管子
    if (self.f % 200 == 0) {
     new Pipe();
    }
    // 清屏
    self.ctx.clearRect(0, 0, 600, 800);
    // 打印
    self.bg.render();
    self.land.update();
    self.land.render();
    // Pipe.update();
    // Pipe.render();
    // 通过遍历数组来进行管子 的更新与渲染
    for (var i = 0; i < pipeArr.length; i++) {
      pipeArr[i].update();
      pipeArr[i] && pipeArr[i].render();
  }
   
    // 定时器的帧数要在背景之后写，因为后写的会把先写的盖住
    self.ctx.fillText(self.f,30,30);
   
  },20);
};
