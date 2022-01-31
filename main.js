let down
let fruitPosX = []
let fruitPosY = []
let posX,posY
let vFruit = []
function setup() {
  createCanvas(displayWidth,displayHeight/2)
  s = new Snake()
  down = false
  fruits()
}

function fruits(){
  for(let i = 0; i <= width - 10; i += 10){
    fruitPosX.push(i)
  }
  for(let i = 0; i <= height - 10; i += 10){
    fruitPosY.push(i)
  }
  for(let i = 0; i <= random(1,10); i++){
  posX = random(fruitPosX)
  posY = random(fruitPosY)
  vFruit.push(createVector(posX,posY))
  }
}

function randomFruit(pos){
    for(let j = 0; j < vFruit.length - 1; j++){
      if(pos.x == vFruit[j].x && pos.y == vFruit[j].y){
        vFruit[j].x = random(fruitPosX) 
        vFruit[j].y = random(fruitPosY)  
      }
    }
}


function draw() {
  background(25)
  frameRate(10)
  s.update()
  s.show()
  if(down){
    s.setDir(0,10)
  }else{
    s.setDir(10,0)
  }
  fill(0,225,0)
  for(let i = 0; i < vFruit.length-1; i++){
  rect(vFruit[i].x, vFruit[i].y,10,10, 10)
    s.eat(vFruit[i])
  }

}

function mouseClicked() {
  down = !down
for(let i = 0; i < 5; i++){
  s.grow()
}
}


  

class Snake {
  
  constructor(){
    this.body = [];
    this.body[0] = createVector(0, 0);
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }
  
  setDir(x,y){
    this.xdir = x;
    this.ydir = y;
  }
  
  update() {
    let head = this.body[this.body.length-1].copy();
    this.body.shift()
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
    if(head.x > width-10){
      head.x = 0
    }
    if(head.y > height-10){
      head.y = 0
    }
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    for(let i = 0; i < this.len; i++){
      if(x == this.body[i].x && y == this.body[i].y){
         let head = this.body[this.body.length-1].copy();
         print('game over')
         this.len = 0
         this.body = []
         this.body[0] = head
        fruits()
      }
    }
  }
  
  grow(){
    let head = this.body[this.body.length-1].copy();
    print('head')
    print(head)
    this.len++;
    this.body.push(head);
    print('body')
    print(this.body)
  }
  
  eat(pos){
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if (x == pos.x && y == pos.y){
      this.grow();
      randomFruit(pos)
      return true;
    }
    return false;
  }
  
  show() {
    for (let i = 0; i < this.body.length; i++) {
    fill(225,0,0);
    noStroke();
    rect(this.body[i].x, this.body[i].y, 10, 10)
  }    
  }
}
