import React from 'react'
import './styles.css'
import {Link} from 'react-router-dom'

const About = ()=>{
    return(
        <div className='container' id="aboutContainer">
            <div className='content'>
                <h1 className='title'>Hello!</h1>
                <p style={{fontSize: "30px"}}>Welcome to Boingle Box!  We are a locally owned portable storage unit company located right here in Salt Lake City, UT.</p>
                <p style={{fontSize: "30px"}}>We believe that portable storage is the way of the future. Cut out the repetative trips to your storage unit on moving day and let 
                us do the heavy lifting for you.</p>
                <br/>
                <br/>

                <Link to='/contact' className='quoteLinkAbout'>Contact Us</Link>


            </div>

        </div>
    )
}

export default About;