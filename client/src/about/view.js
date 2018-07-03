import React from 'react'
import './styles.css'
import {Link} from 'react-router-dom'
import house from '../images/house.jpg'

const About = ()=>{
    return(
        <div className='container' id="aboutContainer" style={{width: "100%"}}>
            <div className='content' style={{marginTop: "20%"}}>
                <div>
                    <h1 className='title'>Storage delivered to your doorstep.</h1>
                    <br/>
                    <br/>
                    <Link to='/contact' className='quoteLinkAbout'>Contact Us</Link>
                </div>
            </div>
        </div>
    )
}

export default About;