import './pose-detection.js'
export default async function LoadPoseModel(){
    const model = poseDetection.SupportedModels.MoveNet;
    const detector = await poseDetection.createDetector(model);
    return detector;
}