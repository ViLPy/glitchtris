var FailedMode = {
    ROTATION: 0,
    GATE: 1,
    NOFAIL: 2
};

/**
 * @constructor
 */
function GameState() {
    this.baseCanvas = undefined;
    this.score = 0;
    this.container = new Container(22, 32);
    this.initialFillLevel = this.container.getFirstFilledRow();

    // TODO: check if figure copied from last session
    this.figure = new Figure([[Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random())],
        [Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random())],
        [Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random())]]);
    this.figure.setPosition(10, 18);

    this.figureToMatch = this.figure.clone();
    this.figureToMatch.rotateRandomly();

    this.container.setActiveFigure(this.figure);

    this.clock = new Clock(this.updateActive.bind(this), 300);

    // is game session failed
    this.failed = false;
    this.failedMode = FailedMode.NOFAIL;

    this.difficulty = new DifficultyCalculator();
    this.difficulty.addAnchor(0, 1);
    this.difficulty.addAnchor(100, 0.5);
    this.difficulty.addAnchor(150, 0.35);
    this.difficulty.addAnchor(250, 0.25);
}

GameState.prototype.start = function (canvas) {
    this.baseCanvas = canvas;
    UIManager.setValues(this.figureToMatch, this.score);

    InputManager['onLR'] = function () {
    };
    InputManager['onA'] = function () {
        if (LocalDataManager.getData(DataKey.SOUND)) {
            SoundBank.ROTATE.play();
        }
    };
};

GameState.prototype.updateActive = function () {
    var i;
    if (this.figure) {
        this.figure.setPosition(this.figure.x,
            this.figure.y + GameSettings.gravity);

        // when touch container upper side
        if (this.figure.withinBoundTop(0) <= 0) {
            // only if within window and matched with
            var isMatched = this.figure.isEqual(this.figureToMatch);
            var isInBound = this.figure.withinBoundLeft(9) >= 0 && this.figure.withinBoundRight(13) >= 0;
            if (isMatched && isInBound) {
                delete this.figure;
                this.figure = this.container.extractFigure();
                this.container.setActiveFigure(this.figure);

                var currentFill = this.container.getFirstFilledRow();
                if (currentFill > this.initialFillLevel) {
                    for (i = 0; i < currentFill - this.initialFillLevel; i++) {
                        setTimeout(function () {
                            this.container.shiftAndInsert();
                        }.bind(this), 1000 * i + 1000);
                    }
                }

                this.figureToMatch = this.figure.clone();
                this.figureToMatch.rotateRandomly();

                this.score -= 10;
                var interval = 300 - this.difficulty.getForPosition(Math.abs(this.score));
                this.clock.initInterval = Math.max(55, interval);

                if (LocalDataManager.getData(DataKey.SOUND)) {
                    SoundBank.ACCEPTED.play();
                }

                UIManager.setValues(this.figureToMatch, this.score);
            } else {
                if (!isInBound) {
                    this.failedMode = FailedMode.GATE;
                } else {
                    this.failedMode = FailedMode.ROTATION;
                }
                this.failed = true;
                this.clock.stop();
                if (LocalDataManager.getData(DataKey.SOUND)) {
                    SoundBank.GAME_OVER.play();
                }
                this.updateHighScore();
                setTimeout(function () {
                    GlobalStateManager.start(State.RESULT);
                }, 1500);
            }
        }
    }
};

GameState.prototype.updateHighScore = function () {
    var currentScore = LocalDataManager.getData(DataKey.TOP_SCORES) || [];
    currentScore.push(this.score);
    currentScore.sort(function sortNumber(a, b) {
        return a - b;
    });
    LocalDataManager.setData(DataKey.TOP_SCORES, currentScore.slice(0, 6));
};

GameState.prototype.checkInput = function () {
    if (this.failed) {
        return;
    }

    if (InputManager.isPressed(KeyCodes.ACTION)) {
        InputManager.reset(KeyCodes.ACTION);
        if (this.figure) {
            this.figure.rotate();
        }
    }

    if (InputManager.isPressed(KeyCodes.LEFT)) {
        InputManager.reset(KeyCodes.LEFT);
        if (this.figure && this.figure.withinBoundLeft(0) > 0) {
            this.figure.x -= 1;
        }
    }

    if (InputManager.isPressed(KeyCodes.RIGHT)) {
        InputManager.reset(KeyCodes.RIGHT);
        if (this.figure && this.figure.withinBoundRight(this.container.width) > 0) {
            this.figure.x += 1;
        }
    }
};

GameState.prototype.updateAndRender = function (delta) {
    this.checkInput();
    this.clock.update(delta);
    UIManager.drawGameUI(this.baseCanvas);
    if (this.failedMode === FailedMode.GATE) {
        UIManager.drawMismatchGate(this.baseCanvas);
    } else if (this.failedMode === FailedMode.ROTATION) {
        UIManager.drawMismatchRotation(this.baseCanvas);
    }
    this.container.drawContainer(this.baseCanvas, 10, 70);
};