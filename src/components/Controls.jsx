import React from 'react';
import { useState, useEffect } from 'react';
import { Dropdown, Button, Badge, Progress }
  from 'flowbite-react/lib/esm/components/index';

import Selectinput from './Selectinput';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';


const ffmpeg = createFFmpeg({
  log: true,
  corePath: './node_modules/@ffmpeg/core/dist/ffmpeg-core.js'
});


const CONFIGS = {
  mp4:
  {
    args: ['-i', 'video.avi', '-c:v', 'libx264', 'video.mp4'],
    inFilename: 'video.avi',
    outFilename: 'video.mp4',
    mediaType: 'video/mp4',
  },
  webm:
  {
    args: ['-i', 'video.avi', '-c:v', 'libvpx', 'video.webm'],
    inFilename: 'video.avi',
    outFilename: 'video.webm',
    mediaType: 'video/webm',
  },
  mp3:
  {
    args: ['-i', 'audio.wav', '-c:a', 'libmp3lame', 'audio.mp3'],
    inFilename: 'audio.wav',
    outFilename: 'audio.mp3',
    mediaType: 'audio/mp3',
  }
};

function Controls({ files }) {
  console.log("inside controls")
  console.log(files)
  const [vid, setVid] = useState(false)
  const [med, setMed] = useState('none')

  return (
    <div id="controls" className="w-3/4 flex justify-center items-center">
      <div className='bg-gray-800 rounded-lg min-w-fit w-96'>
        <div className='pb-0 px-10 pt-10'>
          <Selectinput />
        </div>
        <div className='p-10 pt-0'>
          <Button
            outline={true}
            gradientDuoTone="purpleToPink"
            className='mt-5'
            onClick={(e) => {
              if (medType() === 'none') { setVid(false); alert('invalid file type'); } else { setVid(true); }
              setMed(medType());
            }}
          >
            Convert
          </Button>
          <div className='p-10 pb-6'>
            <div className='video-holder'>
              {vid ? (<FileConvert {...CONFIGS[med]} file_content={files} />) : ""}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function medType() {
  return document.getElementById('media-value').value
}


function FileConvert({ args, inFilename, outFilename, mediaType, file_content }) {
  console.log(file_content)
  const [videoSrc, setVideoSrc] = useState('');
  const [ready, setReady] = useState(false)
  const load = async () => {
    await ffmpeg.load();
    const file = new Uint8Array(await readFromBlobOrFile(file_content));
    ffmpeg.FS('writeFile', inFilename, await fetchFile(file));
    await ffmpeg.run(...args);
    const data = ffmpeg.FS('readFile', outFilename);
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: mediaType })));
    setReady(true);
  }
  useEffect(() => {
    load();
  }, [])
  return ready ? (
    videoSrc.length === 0 ? null : (
      <video id='player' src={videoSrc} autoPlay controls></video>
    )
  ) : ""
}

const readFromBlobOrFile = (blob) => (
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = ({ target: { error: { code } } }) => {
      reject(Error(`File could not be read! Code=${code}`));
    };
    fileReader.readAsArrayBuffer(blob);
  })
)
export default Controls


/* 

libvpx (webm)
lame (.mp3)
*/

/* 
useEffect(() => {
    if (ffmpeg === null) {
      ffmpeg = createFFmpeg({
        log: true,
        corePath: './static/js/ffmpeg-core.js',
        // corePath: 'https://unpkg.com/@ffmpeg/core@0.8.3/dist/ffmpeg-core.js',
      });
    }
    ffmpeg.setLogger(({ type, message }) => {
      if (type !== 'info') {
        setMessage(message);
      }
    });
    ffmpeg.setProgress(({ ratio }) => {
      if (ratio >= 0 && ratio <= 1) {
        setProgress(ratio * 100);
      }
      if (ratio === 1) {
        setTimeout(() => { setProgress(0); }, 1000);
      }
    });
  });
*/


/* 
<Dropdown
            arrowIcon
            className=""
            label="Dropdown button"
            placement="bottom-end"
            positionInGroup="none"
            title="Dropdown example"
            tooltipArrow
            trigger="click"
          >
            {
              videotype.map((element, index) => {
                return (
                  <Dropdown.Item onClick={() => { itemSelect(element) }} key={index}>
                    <p className='w-max h-max' id='mp4-selector'>{element}</p>
                  </Dropdown.Item>
                )
              })
            }
            <Dropdown.Divider />
            {
              audiotype.map((element, index) => {
                return (
                  <Dropdown.Item onClick={() => { itemSelect(element) }} key={index}>
                    <p className='w-max h-max' id='mp4-selector'>{element}</p>
                  </Dropdown.Item>
                )
              })
            }
          </Dropdown>
*/