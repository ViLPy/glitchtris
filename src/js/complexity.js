/**
 * @param{number} position
 * @param{number} multiplier
 * @param{number=} initialValue
 * @constructor
 */
function Anchor(position, multiplier, initialValue) {
    this.position = position;
    this.multiplier = multiplier;
    this.initialValue = initialValue || 0;
}

/**
 * Difficulty calculator *
 * @constructor
 */
function DifficultyCalculator() {
    this.anchors = [];
}

DifficultyCalculator.prototype.addAnchor = function (position, multiplier) {
    var newAnchor = new Anchor(position, multiplier);
    this.anchors.push(newAnchor);
    var initialValue = 0;
    for (var i = 1; i < this.anchors.length; i++) {
        initialValue += this.anchors[i - 1].multiplier * (this.anchors[i].position - this.anchors[i - 1].position);
    }
    newAnchor.initialValue = initialValue;
};

DifficultyCalculator.prototype.getForPosition = function (position) {
    for (var i = this.anchors.length - 1; i >= 0; i--) {
        var anchor = this.anchors[i];
        if (anchor.position < position) {
            return anchor.initialValue + (position - anchor.position) * anchor.multiplier;
        }
    }
};