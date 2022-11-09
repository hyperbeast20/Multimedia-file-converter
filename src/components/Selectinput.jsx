import React from 'react'
import { useState } from 'react';
import { Select }
  from 'flowbite-react/lib/esm/components/index';


function Selectinput() {
  const audio = ['none', 'mp3']
  const video = ['none', 'webm', 'mp4']
  const inputset = ['audio', 'video']
  const [media, setMedia] = useState('none');
  const [type, setType] = useState('audio');


  return (
    <div className='flex'>

      <Selection id='media-type' value={type} items={inputset} onChange={(e) => { setType(e.target.value); setMedia('none'); console.log(type) }}

        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-xl rounded-r-none p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white inline-block w-1/3 focus:ring-none focus:border-none dark:focus:ring-none dark:focus:border-none"
      />

      {
        <Selection id='media-value' value={media} items={type == 'audio' ? audio : type == 'video' ? video : []} onChange={(e) => { setMedia(e.target.value); console.log(media) }}

          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-xl rounded-l-none p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white inline-block w-2/3 focus:ring-none focus:border-none dark:focus:ring-none dark:focus:border-none"
        />
      }
    </div>
  )
}
export default Selectinput


function Options({ value }) {
  return (
    <option value={value}>
      {value}
    </option>
  )
}

function Selection({ value, onChange, items, className, id }) {
  return (
    <select className={className}
      value={value}
      onChange={onChange}
      id={id}
    >
      {
        items.map((element, i) => {
          return (
            <Options key={i} value={element} />
          )
        })
      }
    </select>
  )
}


/* 
<select id="file-type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-xl rounded-l-none p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white inline-block w-2/3 focus:ring-none focus:border-none dark:focus:ring-none dark:focus:border-none">
              <option value="webm">Webm</option>
              <option value="mov">Mov</option>
            </select>
*/