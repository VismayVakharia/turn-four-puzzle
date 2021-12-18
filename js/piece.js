import * as utils from "./utils.js"


const COLORS = {
    1: "#f04732",
    2: "#f58031",
    3: "#ffec58",
    4: "#809e40",
    5: "#40cefc",
    6: "#2e7efc",
    7: "#d787c7",
    8: "#744038",
    9: "#7c80a5"
}

export class Piece {
    constructor(position, angle, name) {
        this.name = name;
        this.color = utils.randomColor([255, 255, 255], 0.2);
        this.position = position;
        this.angle = angle;
        this.size = 35.0;
        this.points = utils.squircle(0, 0, this.size, 2, 0.7854, 50);
    }

    rotate(point, angle) {
        let rel_x = this.position[0] - point[0];
        let rel_y = this.position[1] - point[1];
        let [nx, ny] = utils.rotate(rel_x, rel_y, angle);
        this.position[0] = nx + point[0];
        this.position[1] = ny + point[1];
        this.angle += angle;
    }

    draw(p5) {
        p5.push();
        p5.translate(...this.position);
        p5.rotate(this.angle);
        p5.beginShape();
        p5.fill(this.color);
        // p5.noStroke();
        for (let p of this.points) {
            p5.vertex(...p);
        }
        p5.endShape(p5.CLOSE);
        p5.fill(0);
        p5.text(this.name, 0, 0)
        p5.rect(-12.5, 22, 25, 4);
        p5.pop();
    }
}
