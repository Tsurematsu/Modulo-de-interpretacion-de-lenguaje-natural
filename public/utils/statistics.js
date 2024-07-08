// import calculo1 from "./statisticsModules/calculo1.js";
// import calculo2 from "./statisticsModules/calculo2.js";
import calculo3 from "./funcionesCalculo/calculo3.js";
export default new function statistics() {
    let ctx = null;
    let canvas = null;
    this.void = (context, proses)=>{
        ctx = context;
        canvas = proses;
        // return calculo1({hands: [], pose: [], endTime: 0, ctx, canvas})
        // return calculo2({
        //     hands: [], 
        //     pose: [], 
        //     endTime: 0, 
        //     ctx, 
        //     canvas,
        //     PositionMouse: {x: 0, y: 0}, 
        //     ClickMouse: {x: 0, y: 0, status: false}
        // })
    }
    this.loop = ({hands, pose, endTime, PositionMouse, ClickMouse})=>{
        if (ctx === null || canvas === null) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // return calculo1({hands, pose, endTime, ctx, canvas});
        // return calculo2({hands, pose, endTime, ctx, canvas, PositionMouse, ClickMouse})
        return calculo3({hands, pose, endTime, ctx, canvas, PositionMouse, ClickMouse})
        return {timeLapse: 100, suma: 1};
    }
}
