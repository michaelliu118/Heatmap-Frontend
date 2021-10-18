import React from 'react'
import './app.css';
import Navigation from '../navbar'
import { useState, useEffect } from 'react';
import HeatmapWindow from '../content/content1/content1.jsx';
import Searchbar from '../searchbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Card from '../card';
import apiFetcher from '../utils/apiFetchers';

function App() {
  const selections = ['DIR', 'REMOVAL_RATE', 'IR'];
  const [initial_page, updateNav] = useState(selections[0])
  const [json_object, update_json_object] = useState(0);

  function fetching_heatmap(){
    fetch('http://localhost:5000/', {
      method:'GET',
      credentials:'include',
      mode: 'cors',
    }).then(
      res=>res.json()
      ).then(
      data=>{
        update_json_object(data);
    }).catch(error => {
      console.log('Download Error: ', error);
    })
  };

  useEffect((fetching_heatmap), []);
  console.log('appp')

  //Display different heatmaps
  function Display() {
    switch (initial_page){
      case 'DIR':
        return (
          <HeatmapWindow name={'DIR'} table_html={json_object===0 ? "<table />" : json_object['DIR']} 
          colorBar_html={json_object===0 ? "<div />" : json_object['DIR_colorBar']} />
        );
        
      case 'REMOVAL_RATE':
        return (
          <div>
            <HeatmapWindow name={'REMOVAL_RATE'} table_html={json_object===0 ? "<table />" : json_object['REMOVAL_RATE']} 
            colorBar_html={json_object===0 ? "<div />" : json_object['REMOVAL_RATE_colorBar']} />
          </div>
        );

      case 'IR':
        return (
          <div>
            woshibaba
          </div>
        );
    }
  }

  return (
    <div className='container'>
      <Navigation names={selections} onChange={updateNav} />
      <Container fluid>
        <Row style={{height:'100px'}}> 
          <Card>
            <Searchbar />
          </Card>
        </Row>
        <Row style={{height:'600px'}}>
            <Card>
              <Display />
            </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;
