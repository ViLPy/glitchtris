/**
 * Figure class *
 * for now 3x3 blocks only *
 * @constructor
 * @param {Array<Array<number>>} data
 * @param {string=} color
 * @param {string=} strokeColor
 * */
function Figure(data, color, strokeColor) {
    this.data = data;
    var index = Math.floor(Math.random() * Colors.length);
    this.color = color || Colors[index];
    this.strokeColor = strokeColor || StrokeColors[index];
    this.x = 0;
    this.y = 0;
}

Figure.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Check if figure n-th row is empty *
 * @param{number} n - row number (zero-based index)
 * @returns {boolean}
 */
Figure.prototype.hasEmptyRow = function (n) {
    return this.data[n].every(function (i) {
        return i === 0;
    });
};

/**
 * Check if figure n-th column is empty *
 * @param{number} n - column number (zero-based index)
 * @returns {boolean}
 */
Figure.prototype.hasEmptyColumn = function (n) {
    return this.data.map(function (row) {
        return row[n];
    }).every(function (i) {
        return i === 0;
    });
};

/**
 * Compacts figure, so empty outer rows/columns are removed *
 * @returns {Array} with compacted figure
 */
Figure.prototype.compact = function () {
    var result = [];
    var fromRow = 2, toRow = 0, fromCol = 2, toCol = 0, i, j;

    for (i = 0; i < 3; i++) {
        if (!this.hasEmptyRow(i)) {
            fromRow = Math.min(fromRow, i);
            toRow = Math.max(fromRow, i);
        }
        if (!this.hasEmptyColumn(i)) {
            fromCol = Math.min(fromCol, i);
            toCol = Math.max(fromCol, i);
        }
    }

    for (j = fromRow; j <= toRow; j++) {
        result[j - fromRow] = [];
        for (i = fromCol; i <= toCol; i++) {
            result[j - fromRow][i - fromCol] = this.data[j][i];
        }
    }

    return result;
};

Figure.prototype.isEqual = function (figure) {
    var compacted = this.compact();
    var figureCompacted = figure.compact();
    if (compacted.length !== figureCompacted.length || compacted[0].length !== figureCompacted[0].length) {
        return false;
    } else {
        return compacted.every(function (block, i) {
            return block.every(function (item, j) {
                return item === figureCompacted[i][j];
            });
        });
    }
};

/**
 * Draw figure on canvas *
 * @param{Canvas} canvas - canvas to draw
 * @param{number} x - canvas x offset in pixels
 * @param{number} y - canvas y offset in pixels
 */
Figure.prototype.drawFigure = function (canvas, x, y) {
    var col, row;
    for (row = 0; row < this.data.length; row++) {
        for (col = 0; col < this.data[row].length; col++) {
            if (this.data[row][col]) {
                canvas.setFillStyle(this.color);
                canvas.fillRectangle(x + (this.x + col) * GameSettings.tileSize,
                    y + (this.y + row) * GameSettings.tileSize,
                    GameSettings.tileSize, GameSettings.tileSize);
                canvas.setStrokeStyle(this.strokeColor);
                canvas.strokeRectangle(x + (this.x + col) * GameSettings.tileSize + 1,
                    y + (this.y + row) * GameSettings.tileSize + 1,
                    GameSettings.tileSize - 2, GameSettings.tileSize - 2);
            }
        }
    }
};

/**
 * Check if figure is within bounds, this check upper side *
 * @param{number} boundUp - bound Y coordinate for checking
 * @returns {number} display how much is figure outside the bound, otherwise returns Infinity
 */
Figure.prototype.withinBoundTop = function (boundUp) {
    var offset = Infinity;
    if (this.y <= boundUp) {
        for (var i = 0; i < GameSettings.blockSize; i++) {
            if (!this.hasEmptyRow(i) && this.y + i <= boundUp) {
                offset = this.y + i - boundUp;
                break;
            }
        }
    }
    return offset;
};

/**
 * Check if figure is within bounds, this check left side *
 * @param{number} boundLeft - bound X coordinate for checking
 * @returns {number} display how much is figure outside the bound, otherwise returns Infinity
 */
Figure.prototype.withinBoundLeft = function (boundLeft) {
    var offset = Infinity;
    if (this.x <= boundLeft) {
        for (var i = 0; i < GameSettings.blockSize; i++) {
            if (!this.hasEmptyColumn(i) && this.x + i <= boundLeft) {
                offset = this.x + i - boundLeft;
                break;
            }
        }
    }
    return offset;
};

/**
 * Check if figure is within bounds, this check right side *
 * @param{number} boundRight - bound X coordinate for checking
 * @returns {number} display how much is figure outside the bound, otherwise returns Infinity
 */
Figure.prototype.withinBoundRight = function (boundRight) {
    var offset = Infinity;
    if (this.x >= boundRight - GameSettings.blockSize) {

        /** @const */
        var maxBlockSizeIndex = GameSettings.blockSize - 1;
        /** @const */
        var maxContainerSizeIndex = boundRight - 1;

        for (var i = maxBlockSizeIndex; i >= 0; i--) {
            if (!this.hasEmptyColumn(i) && this.x + i >= maxContainerSizeIndex) {
                offset = maxContainerSizeIndex - (this.x + i);
                break;
            }
        }
    }
    return offset;
};

Figure.prototype.clone = function () {
    var dataCopy = [], i, j;
    for (i = 0; i < GameSettings.blockSize; i++) {
        dataCopy[i] = [];
        for (j = 0; j < GameSettings.blockSize; j++) {
            dataCopy[i][j] = this.data[i][j];
        }
    }
    return new Figure(dataCopy, this.color, this.strokeColor);
};

Figure.prototype.rotate = function () {
    var result = [], i, j;

    for (i = 0; i < GameSettings.blockSize; i++) {
        result[i] = [];
        for (j = 0; j < GameSettings.blockSize; j++) {
            result[i][j] = this.data[(GameSettings.blockSize - 1) - j][i];
        }
    }

    this.data = result;
};

Figure.prototype.rotateRandomly = function () {
    for (var i = 0; i < ~~(Math.random() * 3) + 1; i++) {
        this.rotate();
    }
};