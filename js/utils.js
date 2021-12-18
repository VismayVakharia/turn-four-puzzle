export function squircle(cx, cy, r, n, angle, num, wx, wy) {
    if (angle === undefined) angle = 0;
    if (num === undefined) num = 200;
    if (wx === undefined) wx = 1;
    if (wy === undefined) wy = 1;

    let points = [];
    for (let t = 0; t < 6.2832; t += 6.2832 / num) {          // 160 vertex points is too much
        let x = Math.pow(Math.abs(Math.cos(t)), 1 / n) * r * wx * Math.sign(Math.cos(t));
        let y = Math.pow(Math.abs(Math.sin(t)), 1 / n) * r * wy * Math.sign(Math.sin(t));
        let [nx, ny] = rotate(x, y, angle);
        points.push([nx + cx, ny + cy]);
    }
    return points;
}

export function rotate(x, y, angle) {
    let nx = x * Math.cos(angle) - y * Math.sin(angle);
    let ny = x * Math.sin(angle) + y * Math.cos(angle);
    return [nx, ny];
}

export function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

/**
 * 
 * @param {Number[]} base base color
 * @param {Number} w weight (0-1)
 */
export function randomColor(base, w) {
    let r = parseInt(Math.random() * 256);
    let g = parseInt(Math.random() * 256);
    let b = parseInt(Math.random() * 256);

    r = (1 - w) * r + w * base[0];
    g = (1 - w) * g + w * base[1];
    b = (1 - w) * b + w * base[2];
    return [parseInt(r), parseInt(g), parseInt(b)];
}
