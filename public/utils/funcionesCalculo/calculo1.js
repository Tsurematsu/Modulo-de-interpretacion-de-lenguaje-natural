import draw from '../draw.js';

function separarPuntos(listaPuntos) {
    const listaX = listaPuntos.map(punto => Math.floor(punto.x));
    const listaY = listaPuntos.map(punto => Math.floor(punto.y));
    return { listaX, listaY };
}

function encontrarMaxMin(lista) {
    if (lista.length === 0) {return { max: undefined, min: undefined };}
    const max = Math.max(...lista);
    const min = Math.min(...lista);   
    return { max, min };
}

const colorPunto = {};
const History = [];
const History1 = [];

const Remanent = {}
function calculateMathPoints({points, id}){
    if (Remanent[id] === undefined) {Remanent[id] = {x:0, y:0, width:0, height:0};}
    const separated = separarPuntos(points);

    const limits = ({
        x: encontrarMaxMin(separated.listaX),
        y: encontrarMaxMin(separated.listaY)
    })

    const area =({
        width: limits.x.max - limits.x.min,
        height: limits.y.max - limits.y.min
    })

    if (Remanent[id].width < area.width) {Remanent[id].width = area.width;}
    if (Remanent[id].height < area.height) {Remanent[id].height = area.height;}

    const middlePoint = ({
        x: limits.x.min + area.width/2,
        y: limits.y.min + area.height/2
    })

    const orientation = ({
        x: middlePoint.x - Remanent[id].x,
        y: middlePoint.y - Remanent[id].y
    })

    const AbsAngle = Math.atan2(orientation.y, orientation.x);
    const AbsDistance = Math.sqrt(orientation.x**2 + orientation.y**2);
    const AbsAngleDeg = {
        x: Math.cos(AbsAngle),
        y: Math.sin(AbsAngle)
    }
    
    Remanent[id] = middlePoint;
    return {
        separated, 
        limits, 
        area, 
        middlePoint, 
        orientation, 
        Abs:{
            angle: AbsAngle,
            distance: AbsDistance,
            angleDeg: AbsAngleDeg,
            orientation: (ond) => {return {x: ond * AbsAngleDeg.x, y: ond * AbsAngleDeg.y}}
        }
    }
}


let H_orientation = null;

export default function calculo1({hands, pose, endTime, ctx, canvas}){
    const id = "left";
    if (hands.length >= 1 && hands[0].handedness == "Left") {
        const points = hands[0].keypoints;
        const MathPoints = calculateMathPoints({points, id});
        const ond = 50;
        
        if (H_orientation === null) { 
            H_orientation = {
                x: MathPoints.Abs.orientation(ond).x,
                y: MathPoints.Abs.orientation(ond).y,
                distance: MathPoints.Abs.distance
            };
        }

        if (MathPoints.Abs.distance > 20) {
            H_orientation = {
                x: MathPoints.Abs.orientation(ond).x,
                y: MathPoints.Abs.orientation(ond).y,
                distance: MathPoints.Abs.distance
            };
        }

        History1.push({
            x: H_orientation .x + canvas.width/2,
            y: H_orientation .y + canvas.height/2
        });
        
        draw.line({
            x:canvas.width/2, 
            y:canvas.height/2
        }, {
            x:canvas.width/2 + H_orientation.x, 
            y:canvas.height/2 + H_orientation.y
        }, "blue", ctx);

        draw.point({
            x: canvas.width/2 + H_orientation.x,
            y: canvas.height/2 + H_orientation.y   
        }, "blue", ctx, 5);

        draw.text(Math.floor(H_orientation.distance), {
            x:canvas.width/2, 
            y:canvas.height/2
        }, "blue", ctx)

        draw.pointLines(History1, "red", ctx)

        const sizeHistory = 15;
        if (History1.length > sizeHistory) {History1.shift();}
        return {timeLapse: 200}
    }
    
    return {timeLapse: 1}
}



function color (r, g, b){ return `rgb(${r},${g},${b})`; }
function color_aleatorio() {
    return color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
}