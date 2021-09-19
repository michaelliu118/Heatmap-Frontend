import React from 'react';
import './card.css';

function Card(props){
    // Create the border structure for the card and displays a title
    return(
        <div className='card ' style={{minHeight:props.height}}>
          {props.children}
        </div>
    );
}

export default Card;