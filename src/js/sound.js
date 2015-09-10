var SoundBank = {
    ROTATE: [0, , 0.1475, , 0.034, 0.262, , , , , , , , 0.1777, , , , , 1, , , 0.1, , 0.3],
    MENU_SELECT: [0, , 0.0807, 0.4028, 0.101, 0.5044, , , , , , 0.4262, 0.5024, , , , , , 1, , , , , 0.3],
    MENU_ACTION: [0, , 0.0494, 0.333, 0.3135, 0.4888, , , , , , 0.369, 0.6492, , , , , , 1, , , , , 0.3],
    GAME_OVER: [3, , 0.3181, 0.2641, 0.4798, 0.0678, , 0.2725, , , , 0.0944, 0.8366, , , , 0.282, -0.0434, 1, , , , , 0.27],
    ACCEPTED: [0, , 0.0336, 0.4918, 0.265, 0.5115, , , , , , 0.4608, 0.5574, , , , , , 1, , , , , 0.4]
};

(function InitSoundBank() {
    Object.keys(SoundBank).forEach(function (key) {
        var player = new Audio();
        player.src = window.jsfxr(SoundBank[key]);
        SoundBank[key] = player;
    });
})();