/**
 * Container for game blocks *
 * @param{number} width - container width in blocks
 * @param{number} height - container height in blocks
 * @constructor
 */
function Container(width, height) {
    this.width = width;
    this.height = height;

    this.data = [];
    for (var i = 0; i < this.height; i++) {
        this.data[i] = [];
        for (var j = 0; j < this.width; j++) {
            this.data[i][j] = 0;
        }
    }

    this.activeFigure = undefined;

    this.randomFill();
}

Container.prototype.randomFill = function () {
    var i;
    var initialFillHeight = Math.ceil(this.height * 0.15);
    for (i = this.height - initialFillHeight; i < this.height; i++) {
        this.insertNewLine(i, 0.5);
    }

    for (i = this.height - initialFillHeight - 2; i < this.height - initialFillHeight; i++) {
        this.insertNewLine(i, 1);
    }
};

Container.prototype.insertNewLine = function (row, emptyBlocksFraction) {
    emptyBlocksFraction = emptyBlocksFraction || 0.5;
    var j;
    for (j = 0; j < this.width; j++) {
        this.data[row][j] = 1;
    }
    for (j = 0; j < this.width * emptyBlocksFraction; j++) {
        this.data[row][~~(Math.random() * this.width)] = 0;
    }
};

Container.prototype.shiftAndInsert = function () {
    this.data.shift();
    this.data.push([]);
    this.insertNewLine(this.height - 1, 0.5);
};

Container.prototype.drawContainer = function (canvas, x, y) {
    for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
            if (!this.data[i][j]) {
                continue;
            }

            canvas.setFillStyle('#2980b9');
            canvas.fillRectangle(x + j * GameSettings.tileSize, y + i * GameSettings.tileSize,
                GameSettings.tileSize, GameSettings.tileSize);
            canvas.setStrokeStyle('#3498db');
            canvas.strokeRectangle(x + j * GameSettings.tileSize + 1, y + i * GameSettings.tileSize + 1,
                GameSettings.tileSize - 2, GameSettings.tileSize - 2);
        }
    }

    if (this.activeFigure) {
        this.activeFigure.drawFigure(canvas, x, y);
    }
};

Container.prototype.setActiveFigure = function (figure) {
    this.activeFigure = figure;
};

Container.prototype.getFirstFilledRow = function () {
    var minRow = this.height - 1;
    for (var i = 0; i < this.height; i++) {
        var hasBlocks = !this.data[i].every(function (el) {
            return el === 0;
        });
        if (hasBlocks) {
            minRow = i;
            break;
        }
    }
    return minRow;
};

Container.prototype.extractFigure = function () {
    var minRow = this.getFirstFilledRow();
    var colIndices = [], i, j;
    this.data[minRow].forEach(function (el, indx) {
        if (el === 1) {
            colIndices.push(indx);
        }
    });
    var randomIndex = Math.floor(Math.random() * colIndices.length);
    var columnIndex = colIndices[randomIndex];
    var startFromColIndex = Utils.randomFromInterval(Math.max(0, columnIndex - 2), columnIndex);

    var result = [];
    for (i = 0; i < GameSettings.blockSize; i++) {
        result[i] = [];
        for (j = 0; j < GameSettings.blockSize; j++) {
            if (startFromColIndex + j >= this.width) {
                result[i][j] = 0;
            } else {
                result[i][j] = this.data[minRow + i][startFromColIndex + j];
                this.data[minRow + i][startFromColIndex + j] = 0;
            }
        }
    }
    var fig = new Figure(result);
    fig.setPosition(startFromColIndex, minRow);
    if (fig.compact().length === 0) {
        return this.extractFigure();
    }
    return fig;
};