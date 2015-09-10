/** @constructor */
function MenuState() {
    this.canvas = undefined;
    this.currentSelectedItem = CurrentMenuItem.START;
}

MenuState.prototype.start = function (canvas) {
    this.canvas = canvas;
    UIManager.setValues(undefined, 0);

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

MenuState.prototype.updateAndRender = function () {
    if (InputManager.isPressed(KeyCodes.LEFT) || InputManager.isPressed(KeyCodes.UP)) {
        this.currentSelectedItem -= 1;
        this.currentSelectedItem = (4 + this.currentSelectedItem) % 4;
        InputManager.reset(KeyCodes.LEFT);
        InputManager.reset(KeyCodes.UP);
    } else if (InputManager.isPressed(KeyCodes.RIGHT) || InputManager.isPressed(KeyCodes.DOWN)) {
        this.currentSelectedItem += 1;
        this.currentSelectedItem = (4 + this.currentSelectedItem) % 4;
        InputManager.reset(KeyCodes.RIGHT);
        InputManager.reset(KeyCodes.DOWN);
    } else if (InputManager.isPressed(KeyCodes.ACTION)) {
        InputManager.reset(KeyCodes.ACTION);
        this.startNext();
    }

    UIManager.setCurrentMenuItem(this.currentSelectedItem);
    UIManager.drawMenuUI(this.canvas);
};

MenuState.prototype.startNext = function () {
    switch (this.currentSelectedItem) {
        case CurrentMenuItem.START:
            GlobalStateManager.start(State.GAME);
            break;
        case CurrentMenuItem.TOP_SCORES:
            GlobalStateManager.start(State.RESULT);
            break;
        case CurrentMenuItem.MUSIC:
            LocalDataManager.setData(DataKey.SOUND, !LocalDataManager.getData(DataKey.SOUND));
            break;
        case CurrentMenuItem.VIBRATION:
            LocalDataManager.setData(DataKey.VIBRATION, !LocalDataManager.getData(DataKey.VIBRATION));
            break;
    }
};