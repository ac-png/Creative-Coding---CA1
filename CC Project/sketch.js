let data;
let stackOptions = ["Male", "Female"];
let colors =["#cb0b7a", "#6022a5", "#1a1a71"];
let barChart;
let stackChart;
let hBarChart;
let hStackChart;
let lineChart;

function preload() {
    data = loadTable('./data/combined.csv', 'csv', 'header');
    font = loadFont('./fonts/Tilt_Warp/TiltWarp-Regular-VariableFont_XROT,YROT.ttf');
}

function setup() {
    createCanvas(1750, 1500);
    background(255);
    pixelDensity(2);
    barChart = new BarChart({
        _title: "Infant Mortality Deaths Under 1 Year in 2020",
        _data: data,
        _xAxis: "Age Group",
        _yAxis: "Total",
        _font: font,
        _colors: colors});
    stackChart = new StackChart({
        _title: "Infant Mortality Deaths Under 1 Year in 2020",
        _data: data,
        _xAxis: "Age Group",
        _yAxis: "Total",
        _font: font,
        _colors: colors,
        _stackOptions: stackOptions});
    hBarChart = new HBarChart({
        _title: "Infant Mortality Deaths Under 1 Year in 2020",
        _data: data,
        _xAxis: "Age Group",
        _yAxis: "Total",
        _font: font,
        _colors: colors});
    hStackChart = new HStackChart({
        _title: "Infant Mortality Deaths Under 1 Year in 2020",
        _data: data,
        _xAxis: "Age Group",
        _yAxis: "Total",
        _font: font,
        _colors: colors,
        _stackOptions: stackOptions});
    lineChart = new LineChart({
        _title: "Infant Mortality Deaths Under 1 Year in 2020",
        _data: data,
        _xAxis: "Age Group",
        _yAxis: "Average",
        _font: font,
        _colors: colors});
}

function draw() {
    background(255);
    barChart.drawChart();
    stackChart.drawChart();
    hBarChart.drawChart();
    hStackChart.drawChart();
    lineChart.drawChart();
}