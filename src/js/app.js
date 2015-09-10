var GameSettings = {
    canvasWidth: 240,
    canvasHeight: 400,
    tileSize: 10,
    gravity: -1,
    blockSize: 3
};

var Colors = [
    '#16a085', '#27ae60', '#2980b9', '#8e44ad',
    '#f39c12', '#d35400', '#c0392b', '#bdc3c7'];
var StrokeColors = [
    '#1abc9c', '#2ecc71', '#3498db', '#9b59b6',
    '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1'];

/** @constructor */
function App() {
    if (LocalDataManager.getData(DataKey.SOUND) === undefined) {
        LocalDataManager.setData(DataKey.SOUND, true);
    }

    if (LocalDataManager.getData(DataKey.VIBRATION) === undefined) {
        LocalDataManager.setData(DataKey.VIBRATION, true);
    }

    this.baseCanvas = new Canvas('base');
    this.glitchCanvas = new Canvas('glitch');
    this.lastCalledTime = undefined;
    this.delta = 0;
    this.renderer = this.render.bind(this);

    GlobalStateManager.init(this.baseCanvas);
    GlobalStateManager.start(State.MENU);
}

App.prototype.start = function () {
    this.render();
    this.glitch();
};

/**
 * Init random glitches *
 */
App.prototype.glitch = function () {
    Glitch.create(this.baseCanvas, this.glitchCanvas);
    setTimeout(function () {
        this.glitchCanvas.clearBlock(0, 0, GameSettings.canvasWidth, GameSettings.canvasHeight);
        setTimeout(this.glitch.bind(this), Math.random() * 4000 + 2000);
    }.bind(this), Math.random() * 150 + 50);
};

App.prototype.render = function () {
    this.requestAnimFrame();

    GlobalStateManager.getState().updateAndRender(this.delta);

    this.queueNewFrame();
};

App.prototype.queueNewFrame = function () {
    if (window.requestAnimationFrame) {
        window.requestAnimationFrame(this.renderer);
    } else {
        window.setTimeout(this.renderer, 16.7);
    }
};

App.prototype.requestAnimFrame = function () {
    if (!this.lastCalledTime) {
        this.lastCalledTime = new Date().getTime();
        return;
    }
    var currentTime = new Date().getTime();
    this.delta = (currentTime - this.lastCalledTime) / 1000;
    this.lastCalledTime = currentTime;
};