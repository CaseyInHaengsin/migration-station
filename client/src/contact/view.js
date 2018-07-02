import React from 'react'
import './styles.css'
import {Link} from 'react-router-dom'
import image1 from '../images/orangeLogo.png'
import ScrollAnimation from 'react-animate-on-scroll';

const Contact =()=>{
    return(
        <div className='contactContainer'>
            <br/>
            <br/>
            <br/>
            <h1 className='title'>Contact Us</h1>
            <Link to='/' style={{color: "#E7BD8C", fontSize: "32px", textDecoration: "none", marginTop: "-3%"}}><i class="fas fa-long-arrow-alt-left" style={{marginRight: '-5%'}}></i>Go Back</Link>
            
            <div style={{display: "flex", marginLeft: "10%", marginRight: "10%", marginTop: "2%"}}>

                <div style={{flex: "1"}}>

                <ScrollAnimation animateIn="bounceInDown" duration={2}>
                    <h2>Phone</h2>
                    <p>801-900-4528</p>
                    <p>1-844-BOINGLE (844-264-6453)</p>
                </ScrollAnimation>
                    
                <ScrollAnimation animateIn="slideInLeft" duration={1.5}>
                    <h2>Email</h2>
                    <a href="mailto:Parkwaystoragecenter@gmail.com">Parkwaystoragecenter@gmail.com</a>
                </ScrollAnimation>

                <ScrollAnimation animateIn="bounceInUp" duration={2.5}>
                    <h2>Address</h2>
                    <p>22 East 1500 South</p>
                    <p>American Fork, UT 84003</p>
                </ScrollAnimation>

                </div>

                <div style={{flex: "1"}}>
                    <img className='signImage' src={image1}/>
                </div>

            </div>
        </div>
    )
}

export default Contact;