let THISctx = null;
function setContext(context){
    THISctx = context;
}

function drawText(text, point, color = 'black', ctx= null){
    if (ctx == null) {ctx = THISctx;}
    ctx.fillStyle = color;
    ctx.fillText(text, point.x, point.y);
}

function drawLineAll({point, color = 'blue', ctx, horizontal=false, vertical=false}) {
    if (typeof point !== 'object') {point = {x: point, y: point};}
    if (horizontal) {
        drawLine({x: 0, y: point.y}, {x: ctx.canvas.width, y: point.y}, color, ctx);
    }
    if (vertical) {
        drawLine({x: point.x, y: 0}, {x: point.x, y: ctx.canvas.height}, color, ctx);
    }
}

function drawLinesAll({points, color = 'blue', ctx, }) {
    for (const element of points) {drawLineAll({point:element.point, color:element.color??color, ctx, horizontal: element.horizontal??null, vertical:element.vertical??null});}
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

function drawHLines({
    points, 
    basePoint={x:100, y:100}, 
    color='blue', 
    ctx, 
    separation=10, 
    horizontal = true, 
    vertical = false
}){
    ctx.strokeStyle = color;
    for (let i = 0; i < points.length - 1; i++) {
        let OlbPoint = points[i];
        let NewPoint = points[i + 1];

        // Función para procesar un punto
        function processPoint(point) {
            if (typeof point !== 'object') {
                if (vertical && !horizontal) {
                    return {x: basePoint.x, y: point};
                } else if (horizontal && !vertical) {
                    return {x: point, y: basePoint.y};
                } else {
                    // Si ambos son true o false, no modificamos
                    return {x: point, y: point};
                }
            } else {
                // Si el punto es un objeto
                if (vertical && !horizontal && point.y !== undefined) {
                    return {x: basePoint.x, y: point.y};
                } else if (horizontal && !vertical && point.x !== undefined) {
                    return {x: point.x, y: basePoint.y};
                } else {
                    // Si ambos están definidos o ninguno está habilitado, no modificamos
                    return point;
                }
            }
        }
        OlbPoint = processPoint(OlbPoint);
        NewPoint = processPoint(NewPoint);

        // Asignar valores por defecto si x o y no están definidos
        OlbPoint = {x: OlbPoint.x ?? basePoint.x, y: OlbPoint.y ?? basePoint.y};
        NewPoint = {x: NewPoint.x ?? basePoint.x, y: NewPoint.y ?? basePoint.y};
        const stepLapse = 1;
        const I_history = points.length - i - 1;
        if (horizontal && !vertical) {
            OlbPoint.y = OlbPoint.y + (separation*I_history);
            NewPoint.y = NewPoint.y + (separation*(I_history-stepLapse));
        }else if (vertical && !horizontal) {
            OlbPoint.x = OlbPoint.x + (separation*I_history);
            NewPoint.x = NewPoint.x + (separation*(I_history-stepLapse));
        }

        ctx.beginPath();
        ctx.moveTo(OlbPoint.x, OlbPoint.y);
        ctx.lineTo(NewPoint.x, NewPoint.y);
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

function drawLineBasePoint({point, basePoint, color='red', ctx}){
    const sumaVectores = {x: point.x + basePoint.x, y: point.y + basePoint.y};
    drawLine(basePoint, sumaVectores, color, ctx);
    return sumaVectores;
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
    text: drawText,
    HLines: drawHLines,
    LinesAll: drawLinesAll,
    LineAll: drawLineAll,
    LineBasePoint: drawLineBasePoint,
}