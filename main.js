var Game = {};

ALIVE_DENSITY = 0.7;
CELL_SIZE = 10;

Game.init = function () {
    Game.fps = 50;
    Game.canvas = document.getElementById('main');
    Game.ctx = Game.canvas.getContext('2d');

    Game.height = 100;
    Game.width = 100;

    /**
     * A game of life field
     *
     * 1 means alive cell
     * 0 means dead cell
     * @type {Array}
     */
    Game.map = [];

    initializeGameField()
};

function initializeGameField() {
    for (var i = 0; i < Game.width * Game.height; i++) {
        if (Math.random() > ALIVE_DENSITY) {
            Game.map.push(1)
        } else {
            Game.map.push(0)
        }
    }
}

Game.run = function () {
    Game.update();
    Game.render();
};

Game.render = function () {
    Game.ctx.clearRect(0, 0, Game.canvas.clientWidth, Game.canvas.clientHeight);

    for (var i = 0; i < Game.map.length; i++) {
        var x = i % Game.width;
        var y = (i - x) / Game.width;

        var alive = Game.map[i];

        if (alive === 1) {
            Game.ctx.fillStyle = 'rgb(200, 255, 0)';
            Game.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
};

Game.update = function () {
    Game.map = [];
    initializeGameField();
};

function main() {
    Game.init();

    Game._intervalId = setInterval(Game.run, 1000 / Game.fps);
}