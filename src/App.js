import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import Navbar from './components/Navbar/Navbar'
import HomeLeft from './components/HomeLeft/HomeLeft'
import HomeRight from './components/HomeRight/HomeRight'
import Footer from './components/Footer/Footer'


function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const TOTAL_POPULATION = 25523610; // source: https://www.worldometers.info/world-population/australia-population/ 20200729
  const states = [
    'Total',
    'ACT',
    'NSW',
    'NT',
    'QLD',
    'SA',
    'TAS'
  ]

  const getData = async () => {
    const url = 'https://services1.arcgis.com/vHnIGBHHqDR6y0CR/arcgis/rest/services/COVID19_Time_Series/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
    
    let res = await axios.get(url);
    let data = res.data.features;
    setData(data);
    setIsLoading(false);
  }
  
  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="App">
      <Navbar />
      <div className="home-container">
        <HomeLeft />
        <HomeRight />
      </div>
      <Footer />
    </div>
  );
}

export default App;
