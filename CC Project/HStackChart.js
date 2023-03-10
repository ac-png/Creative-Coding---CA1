class HStackChart {
    constructor({
        _charW = 400,
        _charH =775,
        _xPos = 1300,
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
        _colors,
        _stackOptions})
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
        this.stackOptions = _stackOptions;

        this.maxNum = this.calculateMax();
        this.numBars = this.data.getRowCount();
        // Calculates the available space for the bars (excluding margins and space between bars)
        this.remainWidth = this.charH
                            - (this.margin * 2)
                            - ((this.numBars -1) * this.spacing);
        // The remaining width divided by the number of bars
        this.barWidth = this.remainWidth / this.numBars;
        // Is the barWidth including the spacing after the bar
        this.barUnit = this.barWidth + this.spacing;
    }

    /**
        * Creates the chart (with a title)
    */
    drawChart() {
        noFill();
        stroke(50);
        push();           
            translate(this.xPos, this.yPos);
            textFont(this.font);
            this.drawVAxis();
            this.drawHAxis();
            this.drawBars();
            this.legend();
            this.topTitle();
        pop();
    }

    /**
        * Creates the bars
    */
    drawBars() {
        for(let x = 0; x < this.data.getRowCount(); x++){
            push();
                for (let y = 0; y < this.stackOptions.length; y++) {
                    let stackTable = this.stackOptions[y];
                    let width = this.scaler(int(-this.data.rows[x].obj[stackTable]));
                    fill(colors[y]);
                    rect(0, (x * this.barUnit), -width, this.barWidth);
                    translate(-width, 0);
                }
                
                let value = int(-this.data.rows[x].obj[this.width]);
                textSize(13);
                noStroke();
                text(this.data.rows[x].obj[this.yAxis], (this.scaler(value)) + 25, (x * this.barUnit) + 40)
            pop();
        }
    }

    topTitle() {
        fill(0);
        textSize(20);
        textAlign(LEFT);
        text(this.title, 0, -30);
    }

    /**
        * Creates legend (shows what each color of the stack mean)
    */
    legend() {
        push();
            for (let x = 0; x < this.stackOptions.length; x++) {
                fill(colors[x]);
                textSize(20);
                text(this.stackOptions[x], this.charW, this.charH + 50);
                translate(-70, 0);
            }
        pop();
    }

    /**
        * Creates the vertical axis' line and values
    */
    drawVAxis(){
        line(0, this.charH, 0, -10);

        push();
            translate(this.margin, 0);
            let labelArray = this.data.getColumn(this.xAxis);
            for (let x = 0; x < labelArray.length; x++) {
                let labelText = labelArray[x];
                push();
                    translate(10, (x * this.barUnit) + (this.barWidth / 2))
                    rotate(0);
                    fill(0);
                    noStroke();
                    textSize(14);
                    textStyle(BOLD);
                    textAlign(RIGHT, TOP);
                    text(labelText, -30, 0);
                pop();
            }
        pop();
    }

    /**
        * Creates the horizontal axis' line, ticks and values
    */
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
        let scaleValue = this.maxNum / this.charW;
        // Apply the scaling factor to the value for the current bar
        return _num / scaleValue;
    }
}