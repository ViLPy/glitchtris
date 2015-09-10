/**
 * Visual glitch producer *
 * @constructor
 */
function Glitch() {
}

/**
 * Create glitch for inCanvas and draw it on outCanvas *
 * @param{Canvas} inCanvas
 * @param{Canvas} outCanvas
 */
Glitch.create = function (inCanvas, outCanvas) {
    var w = GameSettings.canvasWidth, h = GameSettings.canvasHeight;
    outCanvas.clearBlock(0, 0, w, h);
    var iterations = ~~(Math.random() * 10) + 1;
    for (var i = 0; i < iterations; i++) {
        var x = Math.random() * w;
        var y = Math.random() * h;
        var spliceWidth = w - x;
        var spliceHeight = 5 + Math.random() * (h / 3);
        outCanvas.context.drawImage(inCanvas.canvas, 0, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight);
        outCanvas.context.drawImage(inCanvas.canvas, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight);
    }
};