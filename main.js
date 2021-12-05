import { Game } from "./game.js";

window.sketch = new p5(p5 => { });

sketch.setup = function () {
    let canvas = sketch.createCanvas(400, 400);
    canvas.parent("canvas");
    sketch.frameRate(10);
    sketch.textSize(50);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.game = new Game(100);
    sketch.play = 0;
    sketch.angle = 0;
    sketch.step = sketch.PI / (1 * sketch._targetFrameRate);
}

sketch.draw = function () {
    sketch.clear();
    sketch.background(255);
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
