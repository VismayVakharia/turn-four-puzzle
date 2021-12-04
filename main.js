import { Game } from "./game.js";

window.sketch = new p5(p5 => { });

sketch.setup = function () {
    sketch.createCanvas(400, 400);
    sketch.frameRate(10);
    sketch.textSize(50);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.game = new Game(100);
    sketch.play = false;
    sketch.angle = 0;
    sketch.step = sketch.PI / (1 * sketch._targetFrameRate);
}

sketch.draw = function () {
    sketch.clear();
    sketch.background(200);
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
    if (sketch.play !== 0)
        return false;
    if (sketch.key == "ArrowUp" || sketch.key == "ArrowRight")
        sketch.play = 1;
    else if (sketch.key == "ArrowDown" || sketch.key == "ArrowLeft")
        sketch.play = -1;
    else if (sketch.key == "w")
        sketch.game.update_selection("u");
    else if (sketch.key == "a")
        sketch.game.update_selection("l");
    else if (sketch.key == "s")
        sketch.game.update_selection("d");
    else if (sketch.key == "d")
        sketch.game.update_selection("r");
    return false;
}
