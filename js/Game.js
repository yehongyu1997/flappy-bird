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
    { url: "images/gameover.png", alias: "gameover" },
    { url: "images/btn.png", alias: "btn" },
    { url: "images/0.png", alias: "0" },
    { url: "images/1.png", alias: "1" },
    { url: "images/2.png", alias: "2" },
    { url: "images/3.png", alias: "3" },
    { url: "images/4.png", alias: "4" },
    { url: "images/5.png", alias: "5" },
    { url: "images/6.png", alias: "6" },
    { url: "images/7.png", alias: "7" },
    { url: "images/8.png", alias: "8" },
    { url: "images/9.png", alias: "9" },
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
  this.bird= new Bird();
  // 实例化分数
  this.scoreInstance = new Score();
  // 得分
  this.score=0;
  new Pipe();
  
  self.f = 0;
//   字体样式
  self.ctx.textAlign='left';
  self.ctx.font='30px 宋体';
//   定时器
this.isGameover = false;

// 自己的死亡场景
this.gameoverscene = null;



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
    !self.isGameover &&self.land.update();
    self.land.render();
    !self.isGameover &&self.bird.update();
   self.bird.render();
 
    // Pipe.update();
    // Pipe.render();
    // 通过遍历数组来进行管子 的更新与渲染
    for (var i = 0; i < pipeArr.length; i++) {
      !self.isGameover &&  pipeArr[i].update();
     pipeArr[i] && pipeArr[i].render();
  }
   
    // 定时器的帧数要在背景之后写，因为后写的会把先写的盖住
    self.ctx.fillText(self.f,30,30);
   
    if (self.isGameover) {
      self.gameoverscene.update();
      self.gameoverscene.render();
  }
  self.scoreInstance.render();
  },20);
  // 点击事件，小鸟飞
  // this.canvas.onmousedown = function (e){
  //        self.bird.fly();
  // }
// 添加监听
this.canvas.onmousedown = function (e) {
  if (!self.isGameover) {
      self.bird.fly();
  } else {
      // 当已经死亡了，并且死亡超过了40帧，并且点击的位置也在按钮上
      if (self.gameoverscene.f > 40) {
          if (
              e.offsetX > self.canvas.width / 2 - 58 && e.offsetX < self.canvas.width / 2 + 58
              &&
              e.offsetY > 280 && e.offsetY < 280 + 70
          ) {
              // alert('你点击了按钮');
              // 恢复游戏
              self.score = 0;
              self.bird = new Bird();
              pipeArr = [];
              self.isGameover = false;
          }
      }
  }
}
  
};

Game.prototype.gameover = function () {
  this.isGameover = true;

  // 游戏结束时才会new出结束的画面
  this.gameoverscene= new GameOverScene();
}
