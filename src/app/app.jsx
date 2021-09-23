import React from 'react'
import './app.css';
import Navigation from '../navbar'
import { useState, useEffect } from 'react';
import HeatmapWindow from '../content/content1/content1';
import Searchbar from '../searchbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Card from '../card'

function App() {
  const selections = ['DIR', 'IR'];
  const [initial_page, updateNav] = useState(selections[0])
  const [json_object, update_json_object] = useState(0);
  const ac_models = ['CRJ700', 'CRJ900', 'CRJ1000']

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

  useEffect(fetching_heatmap, []);
  console.log('appp')

  //Display different heatmaps
  function Display() {
    if (initial_page === 'DIR'){
      return (
      <HeatmapWindow name={'DIR'} table_html={json_object===0 ? "" : json_object['DIR']} 
      colorBar_html={json_object===0 ? "<div />" : json_object['DIR_colorBar']} 
      ac_model={ac_models}/>
      );
    } else if (initial_page==='IR'){
      return (
      <div>
        woshimama
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
