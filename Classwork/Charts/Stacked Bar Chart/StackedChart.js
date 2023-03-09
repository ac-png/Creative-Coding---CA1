class StackedChart {
    constructor(_height, _width, _posX, _posY, _data, _gap,  _rotate, _tickLength, _numTicks){
        this.height = _height;
        this.width = _width;
        this.rotate = _rotate;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.gap = _gap;
        this.tickLength = _tickLength;
        this.numTicks = _numTicks;

        this.maxValue = Math.max(...data.map(object => object.Total));
        this.margin = 20;
        this.barWidth = (this.width - (this.margin * 2) - (this.data.getRowCount() - 1) * this.gap) / this.data.getRowCount();

        this.tickGap = -this.height / (-this.numTicks / 1.2);
        this.numGap = this.maxValue / (this.numTicks - 1);
    }

    render() {
        push();
            translate(this.posX, this.posY);
            this.drawHLine();
            this.drawVLine();
            this.drawBChart();
        pop();
    }

    scaling(_num) {
        let scaleValue = this.height / this.maxValue;
        return _num * scaleValue
    }

    drawBChart() {
        for(let x = 0; x < this.data.getRowCount(); x++){
            push();
                translate(this.margin + (x * this.gap), 0);
                push();
                    for (let y = 0; y < userSelect.length; y++) {
                        fill(100, 0, 100);
                        let prop = userSelect[y];
                        let height = this.scaling(int(-this.data.rows[x].obj[prop]));
                        let gap = x * this.barWidth;
                        rect(gap, 0, this.barWidth, height);
                        translate(0, height);
                    }
                pop();
                text(this.data.rows[x].obj.Month, 55 + (x * this.barWidth), 20)
            pop();
        }
    }

    drawHLine() {
        noFill();
        stroke(155);
        line(0, 0, this.width, 0);
    }

    drawVLine() {
        noFill();
        stroke(155);
        line(0, 0, 0, -this.height);
        
        for(let x = 0; x < this.numTicks; x++) {
            line(this.width, x * -this.tickGap, -this.tickLength, x * -this.tickGap);
            textAlign(RIGHT);
            fill(0);
            textSize(15);
            text((x * this.numGap).toFixed(0), -10, x * -this.tickGap);
          }
    }
}