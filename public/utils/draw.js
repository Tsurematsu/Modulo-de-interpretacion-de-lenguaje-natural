function drawPoints (points, ctx, color = 'blue') {
    ctx.fillStyle = color;
    for (const point of points) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function drawBox(dimencion, ctx, color = 'red'){
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.rect(dimencion.xMin, dimencion.yMin, dimencion.width, dimencion.height);
    ctx.stroke();
}
export {drawPoints, drawBox};