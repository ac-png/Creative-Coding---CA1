let fruits = [
  {name:"Apples", sales:50},
  {name:"Oranges", sales:100},
  {name:"Bananas", sales:150},
  {name:"Kiwis", sales:200},
  {name:"Grapes", sales:250},
  {name:"Pineapple", sales:200},
  {name:"Melons", sales:150},
  {name:"Peaches", sales:100},
  {name:"Pears", sales:50}
];

let maxValue = Math.max(...fruits.map(object => object.sales));
let numBlocks = fruits.length;
let chartWidth = 400;
let chartHeight = 400;
let chartxPos = 100;
let chartyPos = 450;
let marginLeft = 20;
let marginRight = 20;
let blockGap = 5;
let screenWidth = 500;
let screenHeight = 500;
let numTicks = 6;
let tickLength = 5;

let blockWidth = (chartWidth - (marginLeft+marginRight) - ((numBlocks - 1) * blockGap))/numBlocks;
let firstBlockxPos = ((screenWidth-chartWidth) / 2) + marginLeft;
let masterGap = blockWidth + blockGap;

function scaler(_num){
    let scaleValue = chartHeight/maxValue;
    return _num * scaleValue
}

function setup(){
    createCanvas(screenWidth,screenHeight);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER); 
}

function draw(){
  drawAxis(createVector(70, 450), 0, chartWidth, 0, 1, 6, 25);
  drawAxis(createVector(0, 0), -90, chartHeight, 0, 1);
  drawChart((0, 0), 90, chartHeight, 0, 1);
}

function drawChart(_pos, _rotationAngle, _length, _strokeColor, _strokeWeight) {
  rotate(_rotationAngle);
  translate(_pos.x, _pos.y);
  stroke(_strokeColor);
  strokeWeight(_strokeWeight);

  for(let x = 0; x < fruits.length; x++){
    push();
      translate(marginLeft + (x * masterGap), 0);
      noStroke();
      fill(0, 0, fruits[x].sales);
      rect(0, 0, blockWidth, scaler(-fruits[x].sales));
    pop();
  }
}

function drawAxis(_pos, _rotationAngle, _length, _strokeColor, _strokeWeight, _numTicks, _tickLength) {
  rotate(_rotationAngle);
  translate(_pos.x, _pos.y);
  stroke(_strokeColor);
  strokeWeight(_strokeWeight);

  line(0, 0, _length, 0);
  
  let _tickGap = -_length / (-_numTicks + 1);
  let _numGap = maxValue / (_numTicks - 1);

  for(let x = 0; x < _numTicks; x++) {
    line(0, x * -_tickGap, -_tickLength, x * -_tickGap);
    noStroke();
    textAlign(RIGHT);
    textSize(15);
    text((x * _numGap).toFixed(2), -10, x * -_tickGap);
  }
}