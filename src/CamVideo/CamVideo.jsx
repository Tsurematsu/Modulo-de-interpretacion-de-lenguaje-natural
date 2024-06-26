import { useRef, useEffect } from 'react';
import urlVideo from './lenguadeseñas Saludos y modales.mp4'
import styles from './CamVideo.module.css';
export default function CamVideo() {
    const {videoRef, canvasRef, prosesRef} = script();
    return (<>
        <div className={styles.main}>
            <video ref={videoRef} src={urlVideo} autoPlay muted loop></video>
            <canvas className={styles.drawPoints} ref={canvasRef}></canvas>
            <canvas className={styles.proses} ref={prosesRef}></canvas>
        </div>
    </>);
}
function script(){
    const worker = new Worker('/worker.js', {type: 'module'});
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const prosesRef = useRef(null);
    useEffect(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const proses = prosesRef.current;
      if (!video || !canvas) return;
      const handleLoadedMetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.style.width = `${video.videoWidth}px`;
        canvas.style.height = `${video.videoHeight}px`;
        
        proses.width = video.videoWidth;
        proses.height = video.videoHeight;
        proses.style.width = `${video.videoWidth}px`;
        proses.style.height = `${video.videoHeight}px`;
        proses.style.backgroundColor = 'white';

        const offscreen = canvas.transferControlToOffscreen();
        const offscreenProses = proses.transferControlToOffscreen();
        const getImageData = getImage(video);
        new function(){
          worker.postMessage({ 
            type: 'startup', 
            canvas: offscreen, 
            proses: offscreenProses 
          }, [offscreen, offscreenProses]);
          
          this.workerStarted = function() {
            const image = getImageData();
            worker.postMessage({ type: 'sendImage', frame: image });}
          const refThis = this;
          worker.onmessage = function(e) {
              const refFunctionThis = refThis[e.data.type]
              if (refFunctionThis) {refFunctionThis.apply(this, [e.data])}
          };
        }
      };
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {video.removeEventListener('loadedmetadata', handleLoadedMetadata);};
    }, []);  
    return {videoRef, canvasRef, prosesRef};
}

function getImage(video) {
    const frameCanvas = document.createElement('canvas');
    const frameCtx = frameCanvas.getContext('2d', { willReadFrequently: true });
    frameCanvas.width = video.videoWidth;
    frameCanvas.height = video.videoHeight;
    return () => {
      frameCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      return frameCtx.getImageData(0, 0, frameCanvas.width, frameCanvas.height)
    };
  }