'use client'

import React, { useRef, useEffect, useContext } from 'react';
import jsQR from 'jsqr';
import { myContext } from '../context/MyContext'
import axios from 'axios'
import { config } from 'dotenv'
import { useRouter } from 'next/navigation';
import { base_url_api, base_url_this } from '../../url_base';

config()

const QRCodeScanner = () => {

  const router = useRouter()

  const videoRef: any = useRef(null);
  const canvasRef: any = useRef(null);

  const { setID, setName } = useContext(myContext)

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const initializeCamera = () => {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error('Erro ao acessar a câmera:', err);
        });
    };

    const scanQRCode = async () => {
      let codeFound = false;

      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code && code.data && code.data.trim() !== '' && !codeFound) {
          await axios.get(`${base_url_api}/get-collaborator-name`, {
            params: {
              id: code.data
            }
          }).then( response => {
            setID(code.data)
            setName(response.data.name)
            router.push(`${base_url_this}/await`)
          }).catch((error) => {
            console.log(error)
          })
        }
      }

      if (!codeFound) {
        requestAnimationFrame(scanQRCode);
      }
    };

    initializeCamera();
    requestAnimationFrame(scanQRCode);

    return () => {
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach((track: any) => track.stop());
      }
    };
  });

  return (
    <div>
      <video ref={videoRef} style={{ height: '500px', width: '500px', maxWidth: '500px', borderRadius: '5px', marginLeft: '30px' }} autoPlay />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default QRCodeScanner;