import { Game } from "./js/game.js";

window.sketch = new p5(p5 => { });

sketch.setup = function () {
    let canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight - 55);
    canvas.parent("canvas");
    sketch.frameRate(10);
    sketch.textSize(50);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.game = new Game(3, 3, 100);
    sketch.selectionKeys = true;
    sketch.play = 0;
    sketch.angle = 0;
    sketch.step = sketch.PI / (1 * sketch._targetFrameRate);
}

sketch.draw = function () {
    sketch.clear();
    sketch.background(255);

    sketch.mousebindings(sketch.mouseX, sketch.mouseY);
    document.querySelector(".p5Canvas").addEventListener("contextmenu", e => e.preventDefault());
    document.querySelectorAll('button').forEach((b) => {
        if (!b.hasAttribute("style")) b.disabled = !sketch.selectionKeys
    });

    sketch.translate(sketch.width / 2, sketch.game.size * (sketch.game.rows / 2 + 0.5));

    if (sketch.play !== 0) {
        if (sketch.angle < sketch.PI / 2) {
            sketch.game.rotate(sketch.play * sketch.step);
            sketch.angle += sketch.step;
        }
        else {
            sketch.angle = 0;
            sketch.play = 0;
        }
    }

    sketch.game.draw(sketch);
}

sketch.windowResized = function () {
    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight - 55);
}

sketch.keyReleased = function () {
    sketch.keybindings(sketch.key);
}

sketch.mouseReleased = function (e) {
    if (sketch.play !== 0) return false;
    if (!sketch.selectionKeys && [0, 2].includes(e.button))
        sketch.play = e.button - 1;
    return false;
}

sketch.touchEnded = () => { return false }

sketch.keybindings = function (key) {
    if (sketch.play !== 0)
        return false;
    switch (key.toUpperCase()) {
        case "ARROWRIGHT":
            sketch.play = 1;
            break;
        case "ARROWLEFT":
            sketch.play = -1;
            break;
        case "W":
            sketch.game.update_selection("u");
            break;
        case "A":
            sketch.game.update_selection("l");
            break;
        case "S":
            sketch.game.update_selection("d");
            break;
        case "D":
            sketch.game.update_selection("r");
            break;
        case "ROW-LESS":
            if (sketch.game.rows - 1 > 2)
                sketch.game = new Game(sketch.game.rows - 1, sketch.game.cols, sketch.game.size);
            document.querySelector("span#rows").innerText = sketch.game.rows;
            break;
        case "ROW-PLUS":
            if (sketch.game.rows + 1 < 6)
                sketch.game = new Game(sketch.game.rows + 1, sketch.game.cols, sketch.game.size);
            document.querySelector("span#rows").innerText = sketch.game.rows;
            break;
        case "COL-LESS":
            if (sketch.game.cols - 1 > 2)
                sketch.game = new Game(sketch.game.rows, sketch.game.cols - 1, sketch.game.size);
            document.querySelector("span#cols").innerText = sketch.game.cols;
            break;
        case "COL-PLUS":
            if (sketch.game.cols + 1 < 6)
                sketch.game = new Game(sketch.game.rows, sketch.game.cols + 1, sketch.game.size);
            document.querySelector("span#cols").innerText = sketch.game.cols;
            break;
    }
    return false;

}

sketch.mousebindings = function (x, y) {
    let nx, ny;
    if (sketch.game.cols % 2 == 0)
        nx = Math.floor((x - sketch.width / 2 - sketch.game.size / 2) / (sketch.game.size)) + 1.0;
    else
        nx = Math.floor((x - sketch.width / 2) / (sketch.game.size)) + 0.5;
    if (sketch.game.rows % 2 == 0)
        ny = Math.floor((y - sketch.game.size * (sketch.game.rows / 2 + 0.5) - sketch.game.size / 2) / (sketch.game.size)) + 1.0;
    else
        ny = Math.floor((y - sketch.game.size * (sketch.game.rows / 2 + 0.5)) / (sketch.game.size)) + 0.5;
    if (sketch.play === 0) {
        if (Math.abs(nx) <= sketch.game.x_lim && Math.abs(ny) <= this.game.y_lim) {
            sketch.selectionKeys = false;
            sketch.game.selection = [nx, ny];
        }
        else {
            sketch.selectionKeys = true;
        }
    }
}
