var KeyCodes = {
    ACTION: 0x41,
    LEFT: 0x25,
    RIGHT: 0x27,
    DOWN: 0x28,
    UP: 0x26
};

/** @constructor */
function Input() {
    this.keys = {};

    this.doKeyPress = this.doKeyPress.bind(this);
    this.attach();

    this['onA'] = function () {
    };
    this['onLR'] = function () {
    };
}

Input.prototype.press = function (key) {
    if (key === KeyCodes.ACTION) {
        this['onA']();
    } else if (key === KeyCodes.DOWN || key === KeyCodes.UP || key === KeyCodes.LEFT || key === KeyCodes.RIGHT) {
        this['onLR']();
    }
    VibrationManager.onTouch();
    this.keys[key] = 1;
};

Input.prototype.reset = function (key) {
    this.keys[key] = 0;
};

Input.prototype.resetAll = function () {
    Object.keys(this.keys).forEach(function (key) {
        this.keys[key] = 0;
    }.bind(this));
};

Input.prototype.isPressed = function (key) {
    return this.keys[key] === 1;
};

Input.prototype.doKeyPress = function (evt) {
    var key = evt.keyCode;
    this.press(key);
};

Input.prototype.attach = function () {
    // keyboard events
    document.body.addEventListener('keydown', this.doKeyPress, false);

    // virtual keyboard
    document.getElementById('vkb_act').addEventListener('touchstart', this.press.bind(this, KeyCodes.ACTION), false);
    document.getElementById('vkb_left').addEventListener('touchstart', this.press.bind(this, KeyCodes.LEFT), false);
    document.getElementById('vkb_right').addEventListener('touchstart', this.press.bind(this, KeyCodes.RIGHT), false);
};

var InputManager = new Input();