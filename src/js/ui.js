var CurrentMenuItem = {
    START: 0,
    TOP_SCORES: 1,
    MUSIC: 2,
    VIBRATION: 3
};

/** @constructor */
function UI() {
    this.figure = undefined;
    this.score = 0;
    this.currentMenuItem = CurrentMenuItem.START;
}

UI.prototype.drawGameUI = function (canvas) {
    this.drawLayout(canvas);
    this.drawText(canvas);
    if (this.figure) {
        this.figure.drawFigure(canvas, 190, 27);
    }
    this.drawRestriction(canvas);
};

UI.prototype.drawMenuUI = function (canvas) {
    this.drawLayout(canvas);
    this.drawText(canvas);
    this.drawLogo(canvas);
    this.drawMenuItems(canvas);
};

UI.prototype.setValues = function (figure, score) {
    this.figure = figure;
    this.score = score;
};

UI.prototype.setCurrentMenuItem = function (itm) {
    this.currentMenuItem = itm;
};

UI.prototype.drawLogo = function (canvas) {
    canvas.setFillStyle('#f39c12');
    canvas.setFont('55px MyPixel');
    canvas.drawText('GLITCH', 20, 120);
    canvas.drawText('TRIS', 55, 170);
};

UI.prototype.drawMenuItems = function (canvas) {
    canvas.setFont('30px MyPixel');
    canvas.setFillStyle((this.currentMenuItem === CurrentMenuItem.START) ? '#f1c40f' : '#7f8c8d');
    canvas.drawText('START', 70, 230);
    canvas.setFillStyle((this.currentMenuItem === CurrentMenuItem.TOP_SCORES) ? '#f1c40f' : '#7f8c8d');
    canvas.drawText('TOP SCORES', 20, 270);

    var sound = LocalDataManager.getData(DataKey.SOUND);
    var vibration = LocalDataManager.getData(DataKey.VIBRATION);

    canvas.setFillStyle((this.currentMenuItem === CurrentMenuItem.MUSIC) ? '#f1c40f' : '#7f8c8d');
    var soundText = 'SOUND ' + (sound ? '(Y)' : '(N)');
    canvas.drawText(soundText, 30, 310);

    canvas.setFillStyle((this.currentMenuItem === CurrentMenuItem.VIBRATION) ? '#f1c40f' : '#7f8c8d');
    var vibrationText = 'VIBRATE ' + (vibration ? '(Y)' : '(N)');
    canvas.drawText(vibrationText, 18, 350);
};

UI.prototype.drawText = function (canvas) {
    canvas.setFillStyle('#7f8c8d');
    canvas.setFont('18px MyPixel');
    canvas.drawText('SCORE', 10, 18);
    canvas.drawText('FIGURE', 160, 18);
    canvas.setFillStyle('#f1c40f');
    canvas.setFont('35px MyPixel');
    canvas.drawText(~~this.score, 10, 55);
};

UI.prototype.showRecords = function (canvas) {
    this.drawLayout(canvas);
    this.drawText(canvas);
    this.drawRecordBoard(canvas);
};

UI.prototype.drawRecordBoard = function (canvas) {
    canvas.setFont('30px MyPixel');
    canvas.setFillStyle('#f39c12');
    canvas.drawText('TOP SCORES', 20, 100);
    canvas.setFont('20px MyPixel');
    var scores = LocalDataManager.getData(DataKey.TOP_SCORES) || [];
    for (var i = 0; i < scores.length; i++) {
        canvas.drawText(scores[i], 30, 140 + i * 20);
    }

    canvas.setFillStyle('#f1c40f');
    canvas.drawText('BACK', 90, 280);
};

UI.prototype.drawLayout = function (canvas) {
    canvas.setFillStyle('#2c3e50');
    canvas.fillRectangle(0, 0, GameSettings.canvasWidth, GameSettings.canvasHeight);
    canvas.setFillStyle('#34495e');
    canvas.fillRectangle(10, 70, GameSettings.canvasWidth - 20, GameSettings.canvasHeight - 80);
};

UI.prototype.drawRestriction = function (canvas) {
    var i;
    canvas.setFillStyle('#e74c3c');
    for (i = 0; i < 11; i++) {
        if (i > 4 && i < 7) {
            continue;
        }
        canvas.fillRectangle(10 + i * GameSettings.tileSize * 2, 65, GameSettings.tileSize, GameSettings.tileSize / 2);
    }
    canvas.setFillStyle('#ecf0f1');
    for (i = 0; i < 11; i++) {
        if (i > 3 && i < 6) {
            continue;
        }
        canvas.fillRectangle(10 + i * GameSettings.tileSize * 2 + GameSettings.tileSize, 65,
            GameSettings.tileSize, GameSettings.tileSize / 2);
    }
};

UI.prototype.drawMismatchRotation = function (canvas) {
    canvas.setFont('30px MyPixel');
    canvas.setFillStyle('#f39c12');
    canvas.drawText('FIGURE', 65, 200);
    canvas.drawText('NOT', 85, 230);
    canvas.drawText('MATCHED', 45, 260);
};

UI.prototype.drawMismatchGate = function (canvas) {
    canvas.setFont('30px MyPixel');
    canvas.setFillStyle('#f39c12');
    canvas.drawText('GATE', 80, 200);
    canvas.drawText('MISSED', 60, 230);
};

var UIManager = new UI();