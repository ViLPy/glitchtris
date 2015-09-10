/** @constructor */
function ResultState() {
    this.canvas = undefined;
}

ResultState.prototype.start = function (canvas) {
    this.canvas = canvas;
    InputManager['onLR'] = function () {
        if (LocalDataManager.getData(DataKey.SOUND)) {
            SoundBank.MENU_SELECT.play();
        }
    };

    InputManager['onA'] = function () {
        if (LocalDataManager.getData(DataKey.SOUND)) {
            SoundBank.MENU_ACTION.play();
        }
    };
};

ResultState.prototype.updateAndRender = function () {
    if (InputManager.isPressed(KeyCodes.ACTION)) {
        if (LocalDataManager.getData(DataKey.SOUND)) {
            SoundBank.MENU_ACTION.play();
        }
        InputManager.reset(KeyCodes.ACTION);
        GlobalStateManager.start(State.MENU);
    }

    UIManager.showRecords(this.canvas);
};