let fruits = [
    {name:"Apples", sales:50},
    {name:"Oranges", sales:100},
    {name:"Bananas", sales:150},
    {name:"Kiwis", sales:200},
    {name:"Grapes", sales:250}
  ];
let charts = [];

function setup(){
    createCanvas(500,500);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);

    charts.push(new BarChart(400, 400, 75, 450, fruits, 5, 0, 0, 6));
}

function draw() {
    charts[0].render();
}