import { Game } from "./game.js";
import { sign } from "./utils.js";

window.sketch = new p5(p5 => { });

sketch.setup = function () {
    let canvas = sketch.createCanvas(400, 400);
    canvas.parent("canvas");
    sketch.frameRate(10);
    sketch.textSize(50);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.game = new Game(100);
    sketch.selectionKeys = true;
    sketch.play = 0;
    sketch.angle = 0;
    sketch.step = sketch.PI / (1 * sketch._targetFrameRate);
}

sketch.draw = function () {
    sketch.clear();
    sketch.background(255);

    sketch.mousebindings(sketch.mouseX, sketch.mouseY);
    document.querySelector(".p5Canvas").addEventListener("contextmenu", e=>e.preventDefault());
    document.querySelectorAll('button').forEach((b) => {
        if (!b.hasAttribute("style")) b.disabled = !sketch.selectionKeys
    });

    sketch.translate(sketch.width / 2, sketch.height / 2);

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

sketch.keyReleased = function () {
    sketch.keybindings(sketch.key);
}

sketch.mouseReleased = function (e) {
    if (sketch.play !== 0) return false;
    if (!sketch.selectionKeys && [0, 2].includes(e.button))
        sketch.play = e.button - 1;
    return false;
}

sketch.touchEnded = () => {return false}

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
    }
    return false;

}

sketch.mousebindings = function (x, y) {
    let nx = x - sketch.width / 2;
    let ny = y - sketch.height / 2;
    if (sketch.play === 0) {
        let threshold = 100 / 2 + 100 * 2.3 / 2;
        if (nx ** 2 + ny ** 2 < threshold ** 2) {
            sketch.selectionKeys = false;
            sketch.game.selection = [nx, ny].map(v => (parseInt(sign(v))))
        }
        else {
            sketch.selectionKeys = true;
        }
    }
}
