var DataKey = {
    SOUND: 1,
    TOP_SCORES: 2,
    VIBRATION: 3
};

/** @constructor */
function LocalData() {}

LocalData.prototype.getData = function (key) {
    if (window.localStorage) {
        var keyData = window.localStorage.getItem(key) || '{}';
        return (JSON.parse(keyData) || {}).data;
    }
};

LocalData.prototype.setData = function (key, data) {
    if (window.localStorage) {
        return window.localStorage.setItem(key, JSON.stringify({data: data}));
    }
};

var LocalDataManager = new LocalData();