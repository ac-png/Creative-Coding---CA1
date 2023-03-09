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

  let table;
  let data = [];

function preload() {
  table = loadTable('data/income-tax-2013-2018.csv', 'csv', 'header');
}

function tidyData() {
    for (let x = 0; x < table.getRowCount(); x++) {
        data.push(table.rows[x].obj);
    }
}

function setup(){
    tidyData();
    createCanvas(500,500);
}

function draw() {
    background(0);
}