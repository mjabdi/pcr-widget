import './App.css';
import React, { useEffect } from 'react';
import WidgetText from './WidgetText';
import WidgetChart from './WidgetChart';


const getPathId = () =>
{
  let urlElements = window.location.pathname.split('/');
  return urlElements[urlElements.length - 1];  
}

function App() {


  useEffect(() => {
    

  }, [])

  return (
      <div className="App">

      {getPathId() === 'text' &&  <WidgetText/>}
      {getPathId() === 'chart' &&  <WidgetChart/>}
       
      </div>
  );
}

export default App;
