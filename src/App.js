import logo from './logo.svg';
import './App.css';
import StripeContainer from './Components/StripeContainer';
import download4 from './assets/download4.jpg'
import { useState } from 'react';

function App() {
  const [showItem, setShowItem] = useState(false)
  return (
    <div className="App">
     {showItem? <StripeContainer/>: <><h3>$10.00</h3> <img src={download4}></img> <button onClick={()=> setShowItem(true)}>Purchase Item</button></>} 
    </div>
  );
}

export default App;
