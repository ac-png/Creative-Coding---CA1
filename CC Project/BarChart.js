class BarChart {
    constructor({
        _charW = 400,
        _charH = 200,
        _xPos = 75,
        _yPos = 250,
        _numTicks = 7,
        _rounding = 5,
        _margin = 15,
        _spacing = 5,

        _title,
        _data,
        _xAxis,
        _yAxis,
        _font,
        _colors,})
        {
        this.charW = _charW;
        this.charH = _charH;
        this.title = _title;
        this.xPos = _xPos;
        this.yPos = _yPos;
        this.numTicks = _numTicks;
        this.rounding = _rounding;
        this.margin = _margin;
        this.spacing = _spacing;
        
        this.title = _title;
        this.data = _data;
        this.xAxis = _xAxis;
        this.yAxis = _yAxis;
        this.font = _font;
        this.colors = _colors;

        this.maxNum = this.calculateMax();
        this.numBars = this.data.getRowCount();
        this.remainWidth = this.charW - (this.margin * 2) - ((this.numBars -1) * this.spacing);
        this.barWidth = this.remainWidth / this.numBars;
        this.barUnit = (this.barWidth + this.spacing); 
    }

    render() {
        noFill();
        stroke(50);
        push();           
            translate(this.xPos, this.yPos);
            textFont(this.font);
            fill(0);
            textSize(20);
            text(this.title, 0, -this.charH - 20);
            this.drawHAxis();
            this.drawVAxis();
            this.drawBars();
        pop();
    }

    drawBars() {
        push();
            translate(this.margin, 0);
            for (let x = 0; x < this.numBars; x++) {
                let colorNum = x % this.colors.length;
                let value = int(-this.data.rows[x].obj[this.yAxis]);
                strokeWeight(this.barWidth);
                stroke(this.colors[colorNum]);
                strokeCap(SQUARE);
                // ! strokeCap(ROUND);
                line(this.margin + (x * this.barUnit), 0, this.margin + (x * this.barUnit), this.scaler(value));
            }
        pop();
    }

    drawHAxis(){
        line(0, 0, this.charW, 0);

        push();
            translate(this.margin, 0);
            let labelArray = this.data.getColumn(this.xAxis);
            for (let x = 0; x < labelArray.length; x++) {
                let labelText = labelArray[x];
                push();
                    translate((x * this.barUnit) + (this.barWidth / 2), 10);
                    let colorNum = x % this.colors.length;
                    rotate(45);
                    fill(this.colors[colorNum]);
                    noStroke();
                    textSize(14);
                    textStyle(BOLD);
                    textAlign(LEFT, TOP);
                    text(labelText, 0, 0);
                pop();
            }
        pop();
    }

    drawVAxis(){
        line(0, 0, 0, -this.charH);

        for (let y = 0; y < this.numTicks + 1; y++) {
            let ySpace = this.charH / this.numTicks;
            stroke(0);
            line(0, -ySpace * y, -10, -ySpace * y);
            stroke(200);
            line(this.charW, -ySpace * y, 0, -ySpace * y);
            let unitSpace = (this.maxNum / this.numTicks).toFixed();
            
            noStroke();
            fill(50);
            noStroke();
            textSize(20);
            textAlign(RIGHT, CENTER);
            text(y * unitSpace, -15, -ySpace * y);
        }
    }

    calculateMax() {
        let max = 0;
        for (let x = 0; x < this.data.getRowCount(); x++) {
            if (int(this.data.rows[x].obj[this.yAxis]) > max) {
                max = (int(this.data.rows[x].obj[this.yAxis]));
            }
        }

        for (let x = max; x < 1000000; x++) {
            if (x % this.numTicks == 0 && x % this.rounding == 0) {
                max = x;
                break;
            }
        }

        return max;
    }

    scaler(_num) {
        let scaleValue = this.maxNum / this.charH;
        return _num / scaleValue;
    }
}