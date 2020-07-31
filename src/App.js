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
      <HomeLeft />
      <div className="api-data">
        {isLoading 
          ? <h3>loading data...</h3> 
          : data
              .sort((a,b) => b.attributes.Date - a.attributes.Date)
              .map((entry, index) => (
              <div key={index}>
                <h3>{(new Date(entry.attributes.Date)).toString()}</h3>
                <p>Total Cases: {entry.attributes.Total_Cases}</p>
                <p>Total Tests: {entry.attributes.Total_Tests}</p>
                <p>Positive Tests (by test): {((entry.attributes.Total_Cases)*100/entry.attributes.Total_Tests).toFixed(2)}%</p>
                <p>Positive Tests (by population): {((entry.attributes.Total_Cases)*100/TOTAL_POPULATION).toFixed(2)}%</p>
                <p>Total Deaths: {entry.attributes.Total_Deaths}</p>
              </div>
              ))
          }
      </div>    
      <div className="home-container">
        <HomeLeft />
        <HomeRight />
      </div>
      <Footer />
    </div>
  );
}

export default App;
