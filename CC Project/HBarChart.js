class HBarChart {
    constructor({
        _charW = 400,
        _charH = 775,
        _xPos = 700,
        _yPos = 50,
        _numTicks = 7,
        _rounding = 5,
        _margin = 10,
        _spacing = 5,

        _title,
        _data,
        _xAxis,
        _yAxis,
        _font,
        _colors})
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
        this.remainWidth = this.charH - (this.margin * 2) - ((this.numBars -1) * this.spacing);
        this.barWidth = this.remainWidth / this.numBars;
        this.barUnit = this.barWidth + this.spacing;
    }

    render() {
        push();           
            translate(this.xPos, this.yPos);

            textFont(this.font);
            fill(0);
            textSize(20);
            text(this.title, 0, -20)

            this.drawVAxis();
            this.drawHAxis();
            this.drawBars();
        pop();
    }

    drawBars() {
        push();
            for (let x = 0; x < this.numBars; x++) {
                let value = int(this.data.rows[x].obj[this.yAxis]);
                let colorNum = x % this.colors.length;
                fill(colors[colorNum]);
                rect(0, x * this.barUnit, this.scaler(value), this.barWidth);

                textSize(13);
                textAlign(RIGHT);
                text(this.data.rows[x].obj[this.yAxis], (this.scaler(value)) + 25, (x * this.barUnit) + 40);
            }
        pop();
    }

    drawVAxis(){
        line(0, this.charH, 0, -10);

        push();
            translate(this.margin, 0);
            let labelArray = this.data.getColumn(this.xAxis);
            for (let x = 0; x < labelArray.length; x++) {
                let labelText = labelArray[x];
                push();
                    translate(10, (x * this.barUnit) + (this.barWidth / 2));
                    let colorNum = x % this.colors.length;
                    rotate(0);
                    fill(this.colors[colorNum]);
                    noStroke();
                    textSize(14);
                    textStyle(BOLD);
                    textAlign(RIGHT, TOP);
                    text(labelText, -30, 0);
                pop();
            }
        pop();
    }

    drawHAxis(){
        line(0, this.charH, this.charW, this.charH);

        for (let y = 0; y < this.numTicks + 1; y++) {
            let ySpace = this.charW / this.numTicks;
            stroke(0);
            line(ySpace * y, this.charH, ySpace * y, this.charH + 5);
            stroke(200);
            line(ySpace * y, this.charH, ySpace * y, -10)
            let unitSpace = (this.maxNum / this.numTicks).toFixed();
            
            noStroke();
            fill(50);
            textSize(12);
            textAlign(RIGHT, CENTER);
            text(y * unitSpace, (ySpace * y) + this.margin, this.charH + 15);
        }
    }

    calculateMax() {
        let max = 0;
        for (let x = 0; x < this.data.getRowCount(); x++) {
            if (int(this.data.rows[x].obj[this.yAxis]) > max) {
                max = int(this.data.rows[x].obj[this.yAxis]);
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
        let scaleValue = this.maxNum / this.charW;
        return _num / scaleValue;
    }
}