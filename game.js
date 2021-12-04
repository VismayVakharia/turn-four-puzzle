import { Piece } from "./piece.js";
import { arraysEqual } from "./utils.js";

export class Game {
    constructor(size) {
        this.size = size;
        this.pieces = [];
        let count = 1;
        for (let i of [-1, 0, 1]) {
            for (let j of [-1, 0, 1]) {
                this.pieces.push(new Piece([size * j, size * i], 0, count));
                count++;
            }
        }
        this.selection = [-1, -1];
    }

    rotate(angle) {
        let [x, y] = this.selection;
        for (let p of this.pieces.filter(p => ((p.position[0] * x >= -this.size / 2) && (p.position[1] * y >= -this.size / 2)))) {
            p.rotate([x * this.size / 2, y * this.size / 2], angle);
        }
    }

    update_selection(str) {
        let [x, y] = this.selection;
        if (str == "r") x = 1;
        if (str == "l") x = -1;
        if (str == "u") y = -1;
        if (str == "d") y = 1;
        this.selection = [x, y];
    }

    draw(p5) {
        this.draw_background(p5);
        for (let piece of this.pieces) {
            piece.draw(p5);
        }
    }

    draw_background(p5) {
        p5.push();
        p5.fill(100);
        p5.noStroke();
        for (let p of [[-1.0, -1.0], [-1.0, 1.0], [1.0, 1.0], [1.0, -1.0]]) {
            p5.circle(p[0] * this.size / 2, p[1] * this.size / 2, this.size * 2.3);
        }
        p5.stroke(200, 0, 0);
        p5.strokeWeight(5);
        p5.noFill();
        p5.circle(this.selection[0] * this.size / 2, this.selection[1] * this.size / 2, this.size * 2.3);
        p5.pop();
    }
}
