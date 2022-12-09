import './App.css';
import Snake from './Snake';
import { useEffect, useState } from 'react';

function App() {
  const [blocks, setBlocks] = useState([1]);
  return (
    <div className="App">
        <Snake></Snake>
    </div>
  );
}


export default App;
