import './hand-pose-detection.js'
export default async function LoadHandModel(){
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    // const detectorConfig = { runtime: 'tfjs', solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands', modelType: 'full' }
    const detectorConfig = { runtime: 'tfjs', solutionPath: './hands-model.js', modelType: 'full' }
    const detector = await handPoseDetection.createDetector(model, detectorConfig);
    return detector;
}