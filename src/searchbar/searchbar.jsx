import React from 'react'
import './searchbar.css'

function Searchbar(){
    //var heatmapTable = document.querySelector('table');
    var highlightedCellsSet = new Set();

    //Clear the search results
    function clearSearch(){
        const heatmapTable = document.querySelector('table');
        //The reason for if statement below is in case user click search button when the heatmap has not been rendered yet
        if (heatmapTable!=null){
            //Clear all the cell coordinates in set
            highlightedCellsSet.forEach((value)=>{
                const [i, j] = value;
                heatmapTable.rows[i].cells[j].className = '';
            });
            highlightedCellsSet.clear();
        }
    }

    //when the search button is clicked
    function searchClick(){
        clearSearch();
        const heatmapTable = document.querySelector('table');
        const chapter = document.getElementById('chapter').value;
        const subsystem = document.getElementById('subsystem').value;
        const searchContent = chapter + subsystem;
        if (heatmapTable!=null){
            //whether the input of first box is valid
            if (chapter.length===2 && isNumeric(chapter)) {
                if (subsystem.length===2 && isNumeric(subsystem)){
                    for (let i=1, row; row=heatmapTable.rows[i]; i++){
                        for (let j=1, col; col=row.cells[j]; j++){
                            if (heatmapTable.rows[i].cells[j].innerHTML===searchContent){
                                heatmapTable.rows[i].cells[j].className = 'highlight';
                                highlightedCellsSet.add([i, j]);
                            }
                        }
                    }
                } else if (subsystem.length===0){
                    for (let i=1, row; row=heatmapTable.rows[i]; i++){
                        for (let j=1, col; col=row.cells[j]; j++){
                            if (heatmapTable.rows[i].cells[j].innerHTML.slice(0, 2)===searchContent){
                                heatmapTable.rows[i].cells[j].className = 'highlightFirstHalf';
                                highlightedCellsSet.add([i, j])
                            }
                        }
                    }
                }
            }
        }
    }
    

    //Check whether the input string is number using regExp
    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    return (
    <div className='searchbar-container'>
        <div className='input-box-container'>
            <span>ATA Chapter:</span>
            <input id='chapter' className='input-boxes' type='text' placeholder='Please enter 2 digits ATA Chapter' maxLength='2'/>
        </div>
        <div className='input-box-container'>
            <span>ATA Sub-system:</span>
            <input id='subsystem' className='input-boxes' type='text' placeholder='Please enter 2 digits ATA sub-system' maxLength='2'/>
        </div>
        <div className='input-box-container'>
            <button className='searchbox-button' onClick={searchClick}>Search</button>
            <button className='searchbox-button' onClick={()=>{
                document.getElementById('chapter').value='';
                document.getElementById('subsystem').value='';
                clearSearch();}}>Clear</button>
        </div>
    </div>);
}

export default Searchbar;