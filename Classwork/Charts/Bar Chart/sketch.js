let table;
let data = [];
let charts = [];

function preload() {
    table = loadTable('data/bar-chart.csv', 'csv', 'header');
}

function tidyData() {
    for (let x = 0; x < table.getRowCount(); x++) {
        data.push(table.rows[x].obj);
    }
}

function setup(){
    tidyData();
    createCanvas(500,500);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);

    charts.push(new BarChart(400, 400, 75, 450, table, 5, 0, 0, 6));
}

function draw() {
    charts[0].drawChart();
}