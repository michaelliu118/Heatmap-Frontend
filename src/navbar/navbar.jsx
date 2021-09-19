import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'

function NavBar(props) {
    return (
        <Navbar className = 'nav-margin'>
            <Navbar.Brand className='nav-brand' href="#home">
                <img
                alt=""
                src="https://cpsmhirja.z9.web.core.windows.net/images/MHIRJ_S_FC_POS_RGB.png"
                width="60"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                <b>ATA Heatmap</b>
            </Navbar.Brand>
            <Nav>
                {props.names.map((name, index)=>{
                    return (<Nav.Link key={index} onClick={()=>{props.onChange(name)}}>{name}</Nav.Link>)
                })}
            </Nav>
        </Navbar>
    );
}

export default NavBar;
