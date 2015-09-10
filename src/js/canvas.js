/**
 * Basic canvas operations helper *
 * @param{string} id - canvas DOM element ID
 * @constructor
 */
function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
}

Canvas.prototype.clearBlock = function (x, y, w, h) {
    this.context.clearRect(x, y, w, h);
};

Canvas.prototype.setFont = function (font) {
    this.context.font = font || "20px MyPixel";
};

Canvas.prototype.drawText = function (text, x, y) {
    this.context.fillText(text, x, y);
};

Canvas.prototype.setFillStyle = function (style) {
    style = style || "#000000";
    this.context.fillStyle = style;
};

Canvas.prototype.setStrokeStyle = function (style) {
    style = style || "#000000";
    this.context.strokeStyle = style;
};

Canvas.prototype.fillRectangle = function (x, y, w, h) {
    this.context.fillRect(x, y, w, h);
};

Canvas.prototype.strokeRectangle = function (x, y, w, h) {
    this.context.strokeRect(x, y, w, h);
};