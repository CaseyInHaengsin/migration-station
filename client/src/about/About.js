import React, {Component} from 'react'
import './styles.css'
import { Container, Row, Col, Panel } from 'muicss/react';

class AboutInfo extends Component {


    render() {
  

      return (
        <div style={{marginTop: "5%", padding: "5%"}} id='about-section'>
            <Row>
                <Col md={6} sm={12}>
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height="550px" id="gmap_canvas" src="https://maps.google.com/maps?q=Marina%20Cove%20Storage&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.embedgooglemap.net"></a></div></div>
                </Col>
                <Col md={6} sm={12}>
                <div className='super-title' style={{textAlign: 'center', color: "#56A3A6", marginTop: "-4%"}}>About Us</div>
                <div className='about-text'>Marina Cove Storage is right next to Utah Lake, a convenient place to store anything, especially boats.</div>
                <div className='about-text'>These storage units are perfect for residents of American Fork, Lehi, Cedar Hills, Pleasant Grove,  Alpine or Highland. The Storage Units are located a short distance from the I15 freeway and are quick and easy to access.</div>
                <div className='about-text'>Our West American Fork storage facility is protected day and night by 24hour surveillance and gated keypad / remote entry.</div>
                <div className='about-text'>We have onsite management that is always available to assist you with any questions.</div>
                <div className='about-text' style={{color: "#EFCB6E", fontWeight: "bold"}}>Call today to reserve your unit. 801-230-7452</div>
                </Col>
            </Row>
        </div>

      );
    }
  }
  

export default AboutInfo;