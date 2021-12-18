import { Piece } from "./piece.js";

export class Game {
    constructor(rows, cols, size) {
        this.rows = rows;
        this.cols = cols;
        this.size = size;
        this.pieces = [];
        let count = 1;
        this.y_lim = (rows - 1) / 2;
        this.x_lim = (cols - 1) / 2;
        for (let j = -this.y_lim; j <= this.y_lim; j++) {
            for (let i = -this.x_lim; i <= this.x_lim; i++) {
                this.pieces.push(new Piece([size * i, size * j], 0, count));
                count++;
            }
        }
        this.selection = [-(this.x_lim - 0.5), -(this.y_lim - 0.5)];
    }

    rotate(angle) {
        let [x, y] = this.selection;
        let cx = x * this.size;
        let cy = y * this.size;
        for (let p of this.pieces.filter(p => (((p.position[0] - cx) ** 2 + (p.position[1] - cy) ** 2) <= this.size ** 2))) {
            p.rotate([x * this.size, y * this.size], angle);
        }
    }

    update_selection(str) {
        let [x, y] = this.selection;
        let x_lim = this.x_lim - 0.5;
        let y_lim = this.y_lim - 0.5;
        if (str == "r") x = x + 1 <= x_lim ? x + 1 : x;
        if (str == "l") x = x - 1 >= -x_lim ? x - 1 : x;
        if (str == "u") y = y - 1 >= -y_lim ? y - 1 : y;
        if (str == "d") y = y + 1 <= y_lim ? y + 1 : y;
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

        let y_lim = (this.rows - 2) / 2;
        let x_lim = (this.cols - 2) / 2;
        for (let j = -y_lim; j <= y_lim; j++) {
            for (let i = -x_lim; i <= x_lim; i++) {
                p5.circle(i * this.size, j * this.size, this.size * 2.3);
            }
        }
        p5.stroke(200, 0, 0);
        p5.strokeWeight(5);
        p5.noFill();
        p5.circle(this.selection[0] * this.size, this.selection[1] * this.size, this.size * 2.3);
        p5.pop();
    }
}
