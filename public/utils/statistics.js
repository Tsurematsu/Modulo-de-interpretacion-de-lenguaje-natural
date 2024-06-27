import calculo1 from "./statisticsModules/calculo1.js";
export default new function statistics() {
    let ctx = null;
    let canvas = null;
    this.void = (context, proses)=>{
        ctx = context;
        canvas = proses;
        return calculo1({hands: [], pose: [], endTime: 0, ctx, canvas})
    }
    this.loop = ({hands, pose, endTime})=>{
        if (ctx === null || canvas === null) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return calculo1({hands, pose, endTime, ctx, canvas});
    }
}
