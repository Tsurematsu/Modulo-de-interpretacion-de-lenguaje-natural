import './utils/tfjs.js';
import statistics from './utils/statistics.js'
import LoadHandModel from './utils/hands/index.js';
import LoadPoseModel from './utils/pose/index.js';
import {drawPoints} from './utils/draw.js';
new function(){
    let canvas, proses, context, ctx, detectorHands, detectorPose;
    
    this.startup = async function(data){
        console.log('worker starting');
        canvas = data.canvas;
        ctx = canvas.getContext('2d', { willReadFrequently: true });
        proses = data.proses;
        context = proses.getContext('2d', { willReadFrequently: true });
        detectorHands = await LoadHandModel();
        detectorPose = await LoadPoseModel();
        statistics.void(context);
        self.postMessage({type: 'workerStarted'});
        console.log('worker started');
    }
    this.sendImage = async function(data){
        const frame = data.frame;
        let hands = [];
        let pose = [];
        const startTime = performance.now();
        if (detectorHands !== null) {hands = await detectorHands.estimateHands(frame);}
        if (detectorPose !== null) {pose = await detectorPose.estimatePoses(frame);}
        const time = performance.now() - startTime;
        statistics.loop({hands, pose, endTime: time});
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (pose.length > 0) {drawPoints(pose[0].keypoints, ctx, "red");}
        if (hands.length > 0) {drawPoints(hands[0].keypoints, ctx, "blue");}
        if (hands.length == 2) {drawPoints(hands[1].keypoints, ctx, "green");}
        await new Promise(resolve => setTimeout(resolve, 1));
        self.postMessage({type: 'workerStarted'});
    }
    const refThis = this;
    self.onmessage = function(e) {
        const refFunctionThis = refThis[e.data.type]
        if (refFunctionThis) {refFunctionThis.apply(this, [e.data])}
    };
}
        // ctx.putImageData(frame, 0, 0);