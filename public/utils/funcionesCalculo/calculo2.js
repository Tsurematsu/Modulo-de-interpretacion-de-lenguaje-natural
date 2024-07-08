import draw from "../draw.js";
import module1 from "./module1.js";
const utilModule1 = new module1();
const H_cache = [];
const S_Pose = {}
export default function calculo2({
    hands, 
    pose, 
    endTime, 
    ctx, 
    canvas, 
    PositionMouse, 
    ClickMouse
}){
    const id = "left";
    const mitadCanvas = {x: ctx.canvas.width/2, y: ctx.canvas.height/2};
    const basePoint = mitadCanvas;
    if (pose.length > 0) {
        function obtenerMedio(punto1, punto2){return punto1 + ((punto2 - punto1)/2);}
        function obtenerPromedio(punto1, punto2){return {
            x: (punto1.x + punto2.x) / 2,
            y: (punto1.y + punto2.y) / 2
        };}
        const Pose = pose[0].keypoints;
        const Muñeca_1 = Pose[9];
        const Muñeca_2 = Pose[10];
        draw.point(Muñeca_1, "green", ctx, 4);
        draw.point(Muñeca_2, "green", ctx, 4);
        
        // S_Pose.Manos = S_Pose.Manos|| {Left:{},Right:{}}
        // S_Pose.Manos.Left = S_Pose.Manos.Left || {};
        // S_Pose.Manos.Right = S_Pose.Manos.Right || {};
        // S_Pose.Manos.Left.remanente = S_Pose.Manos.Left.remanente || {x:0, y:0};
        // S_Pose.Manos.Right.remanente = S_Pose.Manos.Right.remanente || {x:0, y:0};
        // S_Pose.Manos.Left.orientation = utilModule1.orientation(Muñeca_1, S_Pose.Manos.Left.remanente);
        // S_Pose.Manos.Right.orientation = utilModule1.orientation(Muñeca_2, S_Pose.Manos.Right.remanente);
        // draw.LineBasePoint({ point: S_Pose.Manos.Left.orientation, ctx ,color: "red", basePoint})
        // draw.LineBasePoint({ point: S_Pose.Manos.Right.orientation, ctx ,color: "red", basePoint})
        
        // draw.line(mitadCanvas, utilModule1.sumVectors(mitadCanvas, S_Pose.Manos.Right.orientation), "red", ctx);

        // const y_promedio1 = obtenerPromedio(Pose[4], Pose[3]).y;
        // const y_Promedio2 = obtenerPromedio(Pose[5], Pose[6]).y;
        // const mitad = obtenerMedio(y_promedio1, y_Promedio2);
        // const puntos = [
        //     {point: obtenerMedio(Pose[6].x, Pose[4].x), vertical:true, color: 'red'},
        //     {point: obtenerMedio(Pose[3].x, Pose[5].x), vertical:true, color: 'red'},
        //     {point: y_promedio1, horizontal:true, color: 'red'},
        //     {point: y_Promedio2, horizontal:true, color: 'red'},
        //     {point: mitad, horizontal:true, color: 'blue'}
        // ]
        // draw.LinesAll({points: puntos, ctx, color: 'blue'});


    }
        
    // if (hands.length >= 1 && hands[0].handedness == "Left") {
    //     const handLeft = hands[0].keypoints;
    //     const separatePoints = utilModule1.separatePoints(handLeft);
    //     const amplitude = {
    //         x: utilModule1.amplitude(separatePoints.x),
    //         y: utilModule1.amplitude(separatePoints.y)
    //     }
    //     const area = utilModule1.area(amplitude);
    //     const middlePoint = utilModule1.middlePoint(amplitude, area);
    //     const orientation = utilModule1.orientation(middlePoint);
    //     const gradeOrientation = utilModule1.orientationGrade(orientation);

    //     // if (!ClickMouse.status) {
    //     //     // H_cache.push({
    //     //     //     x: (gradeOrientation.point.x * 100) + 100,
    //     //     //     y: (gradeOrientation.point.y * 100) + 100
    //     //     // });
    //     //     // if (H_cache.length > 100) H_cache.shift();
    //     // }        

    //     if (gradeOrientation.distance > 5) {
    //         draw.line({
    //             x:canvas.width/2, 
    //             y:canvas.height/2
    //         }, {
    //             x: (gradeOrientation.point.x * 100) + canvas.width/2,
    //             y: (gradeOrientation.point.y * 100) + canvas.height/2
    //         }, "red", ctx);
    //     }

       

    //     return {
    //         timeLapse: 10,
    //         suma: ClickMouse.status ? 0 : 1
    //     }
    // }

    return {
        timeLapse: 100, 
        suma: 1
    }
}


// draw.HLines({
        //     basePoint: {x:0, sy:canvas.height/2},
        //     points: H_cache, 
        //     color: 'blue', 
        //     ctx,
        //     separation: 5, 
        //     horizontal: false, 
        //     vertical: true
        // });

        // draw.HLines({
        //     basePoint: {x:10, y:0},
        //     points: H_cache.map(p => ({x: p.y, y: p.x})) ,
        //     color: 'red', 
        //     ctx,
        //     separation: 5, 
        //     horizontal: false, 
        //     vertical: true
        // });
        
        // draw.point(middlePoint, "red", ctx, 4);
        // draw.line({
        //     x:canvas.width/2, 
        //     y:canvas.height/2
        // }, {
        //     x: orientation.x + canvas.width/2, 
        //     y: orientation.y + canvas.height/2
        // }, "red", ctx);
        
        // draw.point({
        //     x: orientation.x + canvas.width/2, 
        //     y: orientation.y + canvas.height/2
        // }, "red", ctx, 4);
        
        // draw.point({
        //     x: remanent.x, 
        //     y: remanent.y
        // }, "blue", ctx, 2);
        
        // draw.line({
        //     x: remanent.x, 
        //     y: remanent.y
        // }, {
        //     x: middlePoint.x, 
        //     y: middlePoint.y
        // }, "blue", ctx);