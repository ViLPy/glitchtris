/**
 * @constructor
 */
function Vibration() {
    navigator.vibrate = navigator['vibrate'] || navigator['webkitVibrate'] || navigator['mozVibrate'] || navigator['msVibrate'];
    if (navigator.vibrate) {
        this.vibrationEnabled = true;
    }
}

Vibration.prototype.onTouch = function () {
    if (this.vibrationEnabled && LocalDataManager.getData(DataKey.VIBRATION)) {
        navigator.vibrate(50);
    }
};

var VibrationManager = new Vibration();