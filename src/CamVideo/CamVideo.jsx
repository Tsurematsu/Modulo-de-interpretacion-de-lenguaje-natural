import { useRef, useEffect } from 'react';
import urlVideo from './lenguadeseñas Saludos y modales.mp4'
import styles from './CamVideo.module.css';
import dataStore from './dataStore.js';
const modeDev = 0;
export default function CamVideo() {
    const {videoRef, canvasRef, prosesRef} = script();
    return (<>
        <div className={styles.main}>
            {modeDev == 0?  <video ref={videoRef} src={urlVideo} muted loop></video>:null}
            {modeDev == 1?  <video ref={videoRef} muted autoPlay></video>:null}
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
      if (modeDev == 1){getWebCam().then(stream => {video.srcObject = stream;})}
      if (!video || !canvas) return;
      const handleLoadedMetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.style.width = `${video.videoWidth}px`;
        canvas.style.height = `${video.videoHeight}px`;
        canvas.style.backgroundColor = modeDev==0?'white':'transparent';
        canvas.style.backgroundColor = dataStore.exist() && modeDev==0?'white':'transparent';
        
        proses.width = video.videoWidth;
        proses.height = video.videoHeight;
        proses.style.width = `${video.videoWidth}px`;
        proses.style.height = `${video.videoHeight}px`;
        proses.style.backgroundColor = 'white';

        const offscreen = canvas.transferControlToOffscreen();
        const offscreenProses = proses.transferControlToOffscreen();
        const getImageData = getImage(video);
        new function(){
          let previous = null;
          if (modeDev == 0) {
            previous = dataStore.exist() ? dataStore.get() : null;
            if (previous== null) {
              video.play();
            }
          }

          worker.postMessage({ 
            type: 'startup', 
            previous,
            canvas: offscreen, 
            proses: offscreenProses,
            modeDev
          }, [offscreen, offscreenProses]);

          proses.addEventListener('mousemove', (e) => {
            const rect = proses.getBoundingClientRect();
            worker.postMessage({
              type: 'mousemove',
              canvas: getAbsolutePosition(proses),
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
            });
          });
          
          // click down
          proses.addEventListener('mousedown', (e) => {
            const rect = proses.getBoundingClientRect();
            worker.postMessage({
              type: 'click',
              canvas: getAbsolutePosition(proses),
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              status: true
            });
          });

          // click up
          proses.addEventListener('mouseup', (e) => {
            const rect = proses.getBoundingClientRect();
            worker.postMessage({
              type: 'click',
              canvas: getAbsolutePosition(proses),
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              status: false
            });
          });
          
          this.workerStarted = function() {
            let image = null;
            if (modeDev == 0) {
              image = dataStore.exist()? null:getImageData()
            }else{image = getImageData();}
            worker.postMessage({ 
              type: 'sendImage',  
              frame: image 
            });
          }

          this.previousData = function(data) {
            if (modeDev == 0) {
              console.log("data recording =>", data);
              dataStore.save(data.data);
            }
          }
          
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

  async function getWebCam() {
      return navigator.mediaDevices.getUserMedia({video: true});
  }


  function getAbsolutePosition(element) {
    const rect = element.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
        x: rect.left + scrollLeft,
        y: rect.top + scrollTop
    };
}