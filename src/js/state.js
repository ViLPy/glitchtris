var State = {
    MENU: 1,
    GAME: 2,
    RESULT: 3
};

/** @constructor */
function StateManager() {
    this.states = {};
    this.activeState = undefined;
    this.canvas = undefined;
}

StateManager.prototype.init = function(canvas) {
    this.canvas = canvas;
    this.states[State.GAME] = GameState;
    this.states[State.MENU] = MenuState;
    this.states[State.RESULT] = ResultState;
};

StateManager.prototype.start = function(state) {
    this.activeState = new this.states[state]();
    this.activeState.start(this.canvas);
};

StateManager.prototype.getState = function() {
    return this.activeState;
};

var GlobalStateManager = new StateManager();