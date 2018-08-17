import React, {Component} from 'react'
import './styles.css'
import { Container, Row, Col, Panel } from 'muicss/react';

class Services extends Component {

    render() {

      return (
          <div className='services-container'>
          
            <Container fluid={true}>

                <Row>
                    <Col sm='12'>  
                    <div className='super-title' style={{color: "#FDCA40", marginTop: "3%"}}>Marina Cove Services</div>
                    </Col>
                </Row>

                <Row>
                    <Col md="4" sm='12'>      
                        <Panel className='panel-height-fix self-storage-section panel-animation'>
                            <div className='panel-title'>Self Storage</div>
                            <div className='panel-subtext'>Multiple sized storage units for your personal storage and moving needs. Our units are dry, clean, and secure!</div>
                        </Panel>
                    </Col>

                    <Col md="4" sm='12'>
                        <Panel className='panel-height-fix boat-storage-section panel-animation'>
                            <div className='panel-title'>Boat Storage</div>
                            <div className='panel-subtext'>we not only offer a place for you to put your boat into storage in Utah, but we also offer winterization services and shrink wrap services.</div>
                        </Panel>
                    </Col>

                    <Col md="4" sm='12'>
                        <Panel className='panel-height-fix rv-storage-section panel-animation'>
                            <div className='panel-title'>Out Door RV Storage</div>
                            <div className='panel-subtext'>Do you need a convenient, safe, secure place to store your RV? Marina Cove Storage offers RV storage at just $3.00 per foot with no length limit.</div>
                        </Panel>
                    </Col>

                    <a href='http://gilagoat.com' target='_blank'><Col md="4" sm='12'>
                        <Panel className='panel-height-fix gilagoat-storage-section panel-animation'>
                            <div className='panel-title'>Trailer Rentals</div>
                            <div className='panel-subtext'>Legendary Adventure Trailers.  Easy fold out trailers with an overlander tent.  Rent or Own one today!</div>
                        </Panel>
                    </Col></a>

                    <a href='http://boinglebox.com' target='_blank'><Col md="4" sm='12'>
                        <Panel className='panel-height-fix boinglebox-storage-section panel-animation'>
                            <div className='panel-title'>Portable Storage Containers</div>
                            <div className='panel-subtext'>Portable storage containers delivered directly to your doorstep.  Pack your belongings conveniently</div>
                        </Panel>
                    </Col></a>

                </Row>

            </Container>
        </div>

      );
    }
  }
  

export default Services;