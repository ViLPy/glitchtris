function onReady(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function hideInfo() {
    var infoBlock = document.getElementById('info');
    var className = 'hidden';

    if (infoBlock.classList) {
        infoBlock.classList.add(className);
    } else {
        infoBlock.className += ' ' + className;
    }
}

function start() {
    var app = new App();
    app.start();

    setTimeout(hideInfo, 3000);
}

onReady(start);