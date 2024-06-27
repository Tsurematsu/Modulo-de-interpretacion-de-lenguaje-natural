import './utils/tfjs.js'; // procesador
import LoadHandModel from './utils/hands/index.js'; // modelo de manos
import LoadPoseModel from './utils/pose/index.js'; // modelo de pose
import statistics from './utils/statistics.js'
import draw from './utils/draw.js';

new function(){
    let canvas, proses, context, ctx, detectorHands, detectorPose;
    let dataRecording =[]
    let statusRecording = true;
    let previousData = null;
    let counter = 0;
    let modeDev = 0;
    this.startup = async function(data){
        console.log('worker starting');
        canvas = data.canvas;
        modeDev = data.modeDev;
        ctx = canvas.getContext('2d', { willReadFrequently: true });
        proses = data.proses;
        context = proses.getContext('2d', { willReadFrequently: true });
        
        previousData = data.previous || null;
        // console.log('previousData =>', previousData);
        if (previousData == null) {
            statusRecording = true;
            detectorHands = await LoadHandModel();
            detectorPose = await LoadPoseModel();
        }else{
            counter = 0;
        }
        
        statistics.void(context, proses);
        self.postMessage({type: 'workerStarted'});
        console.log('worker started');
    }
    this.sendImage = async function(data){
        const frame = data.frame;
        let hands = [];
        let pose = [];
        const startTime = performance.now();
        let time = 0;
        let timeLapse = 1;
        if (previousData == null){
            if (detectorHands !== null) {hands = await detectorHands.estimateHands(frame);}
            if (detectorPose !== null) {pose = await detectorPose.estimatePoses(frame);}   
            time = performance.now() - startTime;
            if (modeDev == 0) {
                if(dataRecording.length < 500){
                    dataRecording.push({hands, pose, time});
                    console.log("Recording => ", dataRecording.length);
                }else if(statusRecording){
                    statusRecording = false;
                    self.postMessage({type: 'previousData', data: dataRecording});
                }
            }
        }else{
            if (counter >= previousData.length) {counter = 0;}
            // console.log('counter =>', counter, previousData.length);
            timeLapse = 1;
            hands = previousData[counter].hands;
            pose = previousData[counter].pose;
            time = previousData[counter].time;
            counter++;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let retorno = statistics.loop({hands, pose, endTime: time});
        if (retorno.timeLapse !== undefined) timeLapse = retorno.timeLapse; 
        
        if (pose.length > 0) {draw.points(pose[0].keypoints, "red", ctx);}
        if (hands.length > 0) {draw.points(hands[0].keypoints, "blue", ctx);}
        if (hands.length == 2) {draw.points(hands[1].keypoints, "green", ctx);}

        await new Promise(resolve => setTimeout(resolve, timeLapse));
        self.postMessage({type: 'workerStarted'});
    }
    const refThis = this;
    self.onmessage = function(e) {
        const refFunctionThis = refThis[e.data.type]
        if (refFunctionThis) {refFunctionThis.apply(this, [e.data])}
    };
}
        // ctx.putImageData(frame, 0, 0);

