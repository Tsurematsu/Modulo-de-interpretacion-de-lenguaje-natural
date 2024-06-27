let THISctx = null;
function setContext(context){
    THISctx = context;
}

function drawText(text, point, color = 'black', ctx= null){
    if (ctx == null) {ctx = THISctx;}
    ctx.fillStyle = color;
    ctx.fillText(text, point.x, point.y);
}

function drawPointLines(points, color = 'blue', ctx= null){
    if (ctx == null) {ctx = THISctx;}
    ctx.strokeStyle = color;
    for (let i = 0; i < points.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
        ctx.stroke();
    }
}

function drawPoints (points, color = 'blue', ctx= null, radio = 2){
    if (ctx == null) {ctx = THISctx;}
    ctx.fillStyle = color;
    for (const point of points) {
        if (point.color != undefined) ctx.fillStyle = point.color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radio, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function drawBox(dimencion, color = 'red', ctx= null){
    if (ctx == null) {ctx = THISctx;}
    ctx.strokeStyle = color;
    ctx.beginPath();
    if (dimencion.xMin !== undefined && dimencion.yMin !== undefined) {
        ctx.rect(dimencion.xMin, dimencion.yMin, dimencion.width, dimencion.height);
    }else{
        ctx.rect(dimencion.x, dimencion.y, dimencion.width, dimencion.height);
    }
    ctx.stroke();
}

function drawLine(startPoint, endPoint, color='red', ctx=null){
    if (ctx == null) {ctx = THISctx;}
    ctx.strokeStyle = color; // Set the color to be used for the line
    ctx.strokeStyle 
    ctx.beginPath(); // Start a new path
    ctx.moveTo(startPoint.x, startPoint.y); // Move the pen to (30, 50)
    ctx.lineTo(endPoint.x, endPoint.y); // Draw a line to (150, 100)
    ctx.stroke(); // Render
}

function drawPoint (point, color = 'blue', ctx= null, radio=2){
    if (ctx == null) {ctx = THISctx;}
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radio, 0, 2 * Math.PI);
    ctx.fill();
}

export default {
    points: drawPoints,
    box: drawBox,
    line: drawLine,
    point: drawPoint,
    setContext: setContext,
    pointLines: drawPointLines,
    text: drawText
}