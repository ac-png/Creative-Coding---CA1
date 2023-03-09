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
        // Calculates the available space for the bars (excluding margins and space between bars)
        this.remainWidth = this.charW
                            - (this.margin * 2)
                            - ((this.numBars - 1) * this.spacing);
        // The remaining width divided by the number of bars
        this.barWidth = this.remainWidth / this.numBars;
        // Is the barWidth including the spacing after the bar
        this.barUnit = (this.barWidth + this.spacing);
    }

    /**
        * Creates the chart (with a title)
    */
    drawChart() {
        stroke(50);
        push();           
            translate(this.xPos, this.yPos);
            textFont(this.font);
            textSize(20);
            text(this.title, 0, -this.charH - 20);
            this.drawHAxis();
            this.drawVAxis();
            this.drawBars();
        pop();
    }

    /**
        * Creates the bars
    */
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
                line(this.margin, 0, this.margin, this.scaler(value));
                // Moves the starting point for the next bar
                translate(this.barUnit, 0);
            }
        pop();
    }

    /**
        * Creates the horizontal axis' line and values
    */
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

    /**
        * Creates the vertical axis' line, ticks and values
    */
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

    /**
        * Calculates the maximum number and rounder the vertical axis numbers
        *
        * @returns {number}
     */
    calculateMax() {
        // Calculates the maximum value in any data row
        let max = 0;
        for (let x = 0; x < this.data.getRowCount(); x++) {
            if (int(this.data.rows[x].obj[this.yAxis]) > max) {
                max = (int(this.data.rows[x].obj[this.yAxis]));
            }
        }

        // Increase max by one at a time until it's divisible by the number of ticks and also divisible by the rounding number
        for (let x = max; x < 1000000; x++) {
            if (x % this.numTicks == 0 && x % this.rounding == 0) {
                max = x;
                break;
            }
        }

        return max;
    }
    
    /**
        * Scales the data values to fit within the chart height
        *
        * @param {*} _num
        * @returns {number}
     */
    scaler(_num) {
        // Calculate the amount to scale each value by
        let scaleValue = this.maxNum / this.charH;
        // Apply the scaling factor to the value for the current bar
        return _num / scaleValue;
    }
}