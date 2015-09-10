/**
 * Helper for calling callback with given interval. Updated through requestAnimationFrame, so freezes on tab switch *
 * @param{function()} callback
 * @param{number} initInterval - initial interval for callback calls
 * @constructor
 */
function Clock(callback, initInterval) {
    this.callback = callback;
    this.initInterval = initInterval;
    this.timeToNextTick = this.initInterval;
    this.isStopped = false;
}

Clock.prototype.stop = function () {
    this.isStopped = true;
};

Clock.prototype.update = function (delta) {
    this.timeToNextTick -= delta * 1000;
    if (!this.isStopped && this.timeToNextTick <= 0) {
        this.callback();
        this.timeToNextTick = this.initInterval;
    }
};

Clock.prototype.setInterval = function (newInterval) {
    this.initInterval = newInterval;
};