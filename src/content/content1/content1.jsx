import React, { useEffect, useState } from 'react';
import './content1.css';


function HeatmapWindow(props) {

    console.log('updated updated')

    //create the useState hook
    const [table_html, update_table_html] = useState(props.table_html);
    const [colorBar_html, update_colorBar_html] = useState(props.colorBar_html);
    const [generate_button_state, update_generate_button_state] = useState('Generate Heatmap');

    //Create an array of past five years that is to be used at year selection dropdown bar
    const current_year = new Date().getFullYear();
    var year_dropdown_bar = [];
    for (let i=5; i>0; i--){
      year_dropdown_bar.push(current_year-i);
    }

    //Create the array for 12 month in a year
    var month_dropdown_bar = [];
    for (let i=1; i<=12; i++){
      month_dropdown_bar.push(i);
    }


    //Initial dropdown bar showing values
    var showing_month_dropdown_bar = month_dropdown_bar[0];
    var showing_ac_model_dropdown_bar = props.ac_model[0];
    var showing_year_dropdown_bar = year_dropdown_bar[year_dropdown_bar.length-1]

    async function update_dropdown_current_value() {
      var year = null;
      var month = null;
      var model = null;
      while (year===null || month===null || model===null){
        await new Promise((resolve, reject)=>{setTimeout(resolve, 500)});
        model = document.getElementById('ac_model_selection');
        year = document.getElementById('year_selection');
        month = document.getElementById('month_selection');
      }
      showing_ac_model_dropdown_bar = model.value;
      showing_year_dropdown_bar = year.value;
      showing_month_dropdown_bar = month.value;
      model.className = 'ac_model_dropdown_bar';
      year.className = 'year_dropdown_bar';
      month.className = 'year_dropdown_bar'
      console.log('wehhh'+showing_ac_model_dropdown_bar);
    }
    //update_dropdown_current_value()
    useEffect(update_dropdown_current_value, [table_html])

  
    function dropdown_onChange(id){
      const element = document.getElementById(id);
      const current_value = element.value;
      if (id==='ac_model_selection'){
        if (current_value!==showing_ac_model_dropdown_bar){
          element.className = 'ac_model_dropdown_bar_on_change';
        } else {
          element.className = 'ac_model_dropdown_bar';
        }
      } else if (id==='year_selection'){
        if (current_value!==showing_year_dropdown_bar){
          element.className = 'year_dropdown_bar_on_change';
        } else {
          element.className = 'year_dropdown_bar';
        }
      } else {
        if (current_value!==showing_month_dropdown_bar){
          element.className = 'year_dropdown_bar_on_change';
        } else {
          element.className = 'year_dropdown_bar';
        }
      }
    }

    //This function is used to fetch heatmap when user click on generate button
    async function fetching_heatmap(){
      //Change the button state to loading
      update_generate_button_state("Loading");
      const button = document.getElementById('generate_heatmap_button');
      button.className = 'generate-heatmap-button-loading';

      //get user selected year and month
      const current_selected_year = document.getElementById('year_selection').value;
      const current_selected_month = document.getElementById('month_selection').value;
      const current_selected_ac_model = document.getElementById('ac_model_selection').value;
      const data = new FormData();
      data.append('year', current_selected_year);
      data.append('month', current_selected_month);
      data.append('metric', props.name);
      data.append('ac_model', current_selected_ac_model);

      //fetch the heatmp of past 12 month from select month
      const post = await fetch('http://localhost:5000/', {
        method:'POST',
        body: data,
        credentials:'include',
        mode: 'cors',
      });

      //handle exception
      if (post.status !== 200){
        return;
      }
      const response = await post.json();
      update_table_html(response['heatmap']);
      update_colorBar_html(response['colorBar']);
  
      // Change the button back to original
      update_generate_button_state('Generate Heatmap')
      button.className = 'generate-heatmap-button';
    }


    return (
    <div style={{display:'grid', height: '100%',placeItems:'center'}}>
        <span className='heatmap-title-span'>{props.name}</span>
        <div className='heatmap-year-legend-container'>
            <div className='date-selection-container'>
              <span style={{fontSize: "18px", marginBottom:"10px"}}>Select AC Model:</span>
              <select className='ac_model_dropdown_bar' id='ac_model_selection' onChange={()=>{dropdown_onChange('ac_model_selection')}}>
                {props.ac_model.map((value, index)=>{
                  return (<option key={index}>{value}</option>);
                })}
              </select>
            </div>
            <div className='date-selection-container'>
              <span style={{fontSize: "18px", marginBottom:"10px"}}>Select Year:</span>
              <select className='year_dropdown_bar' id='year_selection' defaultValue={year_dropdown_bar[year_dropdown_bar.length-1]} onChange={()=>{dropdown_onChange('year_selection')}}>
                {year_dropdown_bar.map((value, index)=>{
                  return (<option key={index}>{value}</option>);
                })}
              </select>
            </div>
            <div className='date-selection-container'>
              <span style={{fontSize: "18px", marginBottom:"10px"}}>Select Month:</span>
              <select className='year_dropdown_bar' id='month_selection' onChange={()=>{dropdown_onChange('month_selection')}}>
                {month_dropdown_bar.map((value, index)=>{
                  return (<option key={index}>{value}</option>);
                })}
              </select>
            </div>
            <button id='generate_heatmap_button' className='generate-heatmap-button' onClick={fetching_heatmap}>{generate_button_state}</button>
            <img style={{marginLeft:"80px"}} src={colorBar_html}/>
        </div>
        <div dangerouslySetInnerHTML={{__html:table_html}} 
                style={{
                    height: "490px",
                    width: "100%", 
                    right: "0",
                    top: "0",
                    overflow: "scroll",
                    backgroundColor: "#e0ebeb"
                }}/>
    </div>);
}

export default HeatmapWindow;