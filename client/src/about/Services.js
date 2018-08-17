import React, {Component} from 'react'
import './styles.css'
import { Container, Row, Col, Panel } from 'muicss/react';

class Services extends Component {

    render() {

      return (
          <div className='services-container'>
            <Container fluid={true}>

                <Row>
                    <Col md="4" sm='12'>      
                        <Panel className='panel-height-fix self-storage-section'>
                            <div className='panel-title'>Self Storage</div>
                            <div className='panel-subtext'>Multiple sized storage units for your personal storage and moving needs. Our units are dry, clean, and secure!</div>
                        </Panel>
                    </Col>

                    <Col md="4" sm='12'>
                        <Panel className='panel-height-fix boat-storage-section'>
                            <div className='panel-title'>Boat Storage</div>
                            <div className='panel-subtext'>we not only offer a place for you to put your boat into storage in Utah, but we also offer winterization services and shrink wrap services.</div>
                        </Panel>
                    </Col>

                    <Col md="4" sm='12'>
                        <Panel className='panel-height-fix rv-storage-section'>
                            <div className='panel-title'>Out Door RV Storage</div>
                            <div className='panel-subtext'>Do you need a convenient, safe, secure place to store your RV? Marina Cove Storage offers RV storage at just $3.00 per foot with no length limit.</div>
                        </Panel>
                    </Col>

                </Row>

            </Container>
        </div>

      );
    }
  }
  

export default Services;