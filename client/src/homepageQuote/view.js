/* eslint-disable no-undef */

import React, { Component} from 'react'
import './styles.css'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom'
import axios from 'axios'
import Logo from '../images/blackLogo.png'

// storing at storage location or their address

class homeQuote extends Component {
	constructor(props) {
        super(props);
		this.state={
			firstName: "",
			lastName: "",
			phoneNumber: "",
            email: "",
            dropDate: "",
            duration: "",
        }
    }

	 handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
        });
    }
    
  
    render() {
        const quoteButton={
            backgroundColor: "#FFF0DF",
            color: "#E7BD8C",
            height: "45px",
            width: "158px",
            borderRadius: "10px",
            marginTop: "5%",
            fontSize: "17px",
            border: "1px solid white!important",
            cursor: "pointer",
            transition: "0.2s ease-in-out"
        }

      return ( 
            <div className="homepageQuoteContainer">

                <Grid fluid style={{width: "100%", marginTop: "9%"}}>
                    <Row><Col xs={12}><h1 className='title'>Boingle Box</h1></Col></Row>
                    <Row><Col xs={12}><h1 className='subTitle'>Portable Storage Containers</h1></Col></Row>

                    <Row><Col xs={12}><h1   className='quoteHeader'>Get An Instant Quote</h1></Col></Row>

                    <Row>
                        <Col xs={6}>
                            <label style={{color: "white"}}>First Name</label>
                            <input name='firstName' onChange={this.handleInputChange} autocomplete="off"></input>
                        </Col>

                        <Col xs={6}>
                        <label style={{color: "white"}}>Last Name</label>
                        <input name='lastName' onChange={this.handleInputChange} autocomplete="off"></input>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                        <label style={{color: "white"}}>Phone Number</label>
                        <input name='phoneNumber' onChange={this.handleInputChange} autocomplete="off"></input>
                        </Col>

                        <Col xs={6}>
                        <label style={{color: "white"}}>Email Address</label>
                        <input name='email' type='email' onChange={this.handleInputChange} autocomplete="off"></input>
                        </Col>
                    </Row>

                    <Row>

                         <Col xs={6}>
                        <label style={{color: "white"}}>Delivery Date</label>
                        <input name='dropDate' type='date' onChange={this.handleInputChange} autocomplete="off"></input>
                        </Col>

                        <Col xs={6}>
                            <label style={{color: "white"}}>Number Of Months Needed</label>
                            <select type="text" name='duration' onChange={this.handleInputChange} autocomplete="off">
                                    <option value="1">1 Month</option>
                                    <option value="2">2 Months</option>
                                    <option value="3">3 Months</option>
                                    <option value="4">4 Months</option>
                                    <option value="5">5 Months</option>
                                    <option value="6">6 Months</option>
                                    <option value="7">7 Months</option>
                                    <option value="8">8 Months</option>
                                    <option value="9">9 Months</option>
                                    <option value="10">10 Months</option>
                                    <option value="11">11 Months</option>
                                    <option value="12">12+ Months</option>
                            </select>
                        </Col>

                    </Row>

                    <Row>
                        <Col xs={12} md={12}>
                            <div style={{marginTop: "9%"}}>
                                <Link className='quoteLinkAbout' style={{marginTop: "3%", color: "white"}} to={{ pathname: '/quote', state: this.state, handleInputChange: this.handleInputChange}}>Next</Link>
                            </div>
                        </Col>
                                
                    </Row>
                </Grid>
            </div>
        )
    }
  }
  
  export default homeQuote;