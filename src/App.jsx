import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Controls from './components/Controls';
import { FileInput }
  from 'flowbite-react/lib/esm/components/index';

function App() {
  const [file, setFile] = useState(false);
  return (
    <div className="App w-full min-h-screen bg-gray-900">
      <Nav />
      <div className='flex justify-center items-center w-full mt-10'>
        <div className='w-fit'><FileInput onChange={(e) => {
          setFile(e.target.files?.item(0));
          console.log("useState");
          console.log(file);
          console.log("e.target.files");
          console.log(e.target.files?.item(0));
          console.log("useState");
          console.log(file);
        }} /></div>
      </div>
      {
        file ? <div className='flex justify-center items-center w-full mt-10'>
          <Controls files={file} />
        </div> : ""
      }
    </div>
  )
}

export default App
