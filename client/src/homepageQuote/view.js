/* eslint-disable no-undef */

import React, { Component} from 'react'
import './styles.css'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom'
import ScrollAnimation from 'react-animate-on-scroll';
import axios from 'axios'



class homeQuote extends Component {
	constructor(props) {
        super(props);
		this.state={
			update: false,
			firstName: "",
			lastName: "",
			phoneNumber: "",
			email: "",
			address: "",
			city: "",
			state: "",
			zipCode: "",
            miles: '0',
            disabled: true,
            size: '20',
            errorMessage: "**All Fields Required Before Generating Your Quote",
            buttonText: "All Fields Required",
            delivery: 75,
            generated: false
		}
		
    }

    componentDidMount () {
        const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD5dghHLGthtmgmyEmUnhNv0bajvm5pP5A&callback=initMap";
        script.async = true;

        document.body.appendChild(script);
    }
    

    handleSubmit = () => {

        const info = this.state;
        this.setState({ messageLoading: true }, () => {
          axios.post(`http://localhost:5000/api/send-message`, info)
            .then(response => {
              if (response.status === 200) {
                this.setState({ messageLoading: false, success: "Thank you, your message has been sent." })
              }
              else {
                this.setState({ messageLoading: false, error: "Sorry, there was an issue sending your message." })
              }
            }).catch(error => {
              console.log("There was an error...", error)
              this.setState({ messageLoading: false, error: "Sorry, there was an issue sending your message." })
            })
        })
      }



    getMapInfo=(event)=>{

        console.log("getting Map Info")

        var currentComponent = this

        var origin1 = '22 east 1500 south, American Fork,UT';
        var destinationA = this.state.address + this.state.city + ',' + this.state.state ;

        var service = new google.maps.DistanceMatrixService;

        service.getDistanceMatrix({
          origins: [origin1],
          destinations: [destinationA],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
            console.log(response.rows[0].elements[0].distance.text)

            var milesText = response.rows[0].elements[0].distance.text;
                milesText = milesText.slice(0,4)

            var value = parseInt(milesText)

            currentComponent.setState({
                miles: value,
                generated: true,
                errorMessage: "Scroll Down for Quote Results"
            })
        });

        setTimeout(() => {
            this.handleSubmit()
        }, 6000);

      }

    

	 handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
        });

        this.buttonCheck()
    }
    
    buttonCheck=(event)=>{

            if(this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.phoneNumber.length === 0 || this.state.email.length === 0 || this.state.address.length === 0 || this.state.city.length === 0 || this.state.state.length === 0 || this.state.zipCode.length === 0){
                
                this.setState({disabled: true, buttonText: "All Fields Required"})

            }else {
                this.setState({disabled: false, errorMessage: "", buttonText: "Generate Quote"})
        }
    }


    form=()=>{

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

        return(
            <Grid fluid style={{width: "100%", marginTop: "9%"}}>
                    <Row><Col xs={12}><h1 className='title'>Boingle Box</h1></Col></Row>
                    <Row><Col xs={12}><h1 className='subTitle'>Portable Storage Containers</h1></Col></Row>

                    <Row><Col xs={12}><h1   className='quoteHeader'>Get An Instant Quote</h1></Col></Row>

                    <Row>
                        <Col xs={6}>
                            <label>First Name</label>
                            <input name='firstName' onChange={this.handleInputChange}></input>
                        </Col>

                        <Col xs={6}>
                        <label>Last Name</label>
                        <input name='lastName' onChange={this.handleInputChange}></input>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                        <label>Phone Number</label>
                        <input name='phoneNumber' onChange={this.handleInputChange}></input>
                        </Col>

                        <Col xs={6}>
                        <label>Email Address</label>
                        <input name='email' onChange={this.handleInputChange}></input>
                        </Col>

                    </Row>

                    <Row>

                        <Col xs={6}>
                        <label>Address</label>
                        <input name='address' onChange={this.handleInputChange}></input>
                        </Col>

                        <Col xs={6}>
                        <label>City</label>
                        <input name='city' onChange={this.handleInputChange}></input>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                        <label>State</label>
                        <input name='state' onChange={this.handleInputChange}></input>
                        </Col>

                        <Col xs={6}>
                        <label>Zip Code</label>
                        <input name='zipCode' onChange={this.handleInputChange}></input>
                        </Col>
                    </Row>

                    <Row>

                        <Col xs={6}>
                        <label>Container Size</label>
                        <select type="text" name='size' onChange={this.handleInputChange}>
                                <option value="16"></option>
                                <option value="16">16 Foot</option>
                                <option value="20">20 Foot</option>
                            </select>
                        </Col>
                    </Row>

                    <Row>

                        <Col xs={12} md={12}>
                            <button class='generateQuoteButton' disabled={this.state.disabled} style={quoteButton} onClick={this.getMapInfo} >{this.state.buttonText}</button>
                        </Col>
                        
                        <Col md={12} style={{marginTop: "4%"}}>
                            <Link to='/contact' className='quoteLinkAbout' style={{marginTop: "3%", color: "white"}}>Contact Us</Link>
                        </Col>

                    </Row>
                </Grid>
        )
    }

    results=()=>{

        var deliveryCharge = this.state.miles > 20 ? (this.state.miles - 20)*3+75 : 75

        return(
            <div style={{maxHeight: "950px", minHeight: "950px"}}>
                    <Grid style={{textAlign: "left", paddingLeft: "10%", marginTop: "5%"}}>
                        <Row>
                            <Col xs={12} md={12}>
                                <h1 className='title'>Miles</h1>
                                <p className='description'>The distance that you are from the store</p>
                                <h2 className='value'>{this.state.miles}</h2>
                            </Col>

                            <Col xs={12} md={12}>
                                <h1 className='title quoteTitleFix'>Rent</h1>
                                <p className='description'>Your monthly rent based on the container size you chose</p>
                                <h2 className='value'>${this.state.size === 16? 179: 199}</h2>
                            </Col>

                            <Col xs={12} md={12}>
                                <h1 className='title quoteTitleFix'>Delivery</h1>
                                <p className='description'>Please note that this only covers your first delivery charge.</p>
                                <br/>
                                <p className='description'>Pick up and delivery to new location will be covered separately.</p>
                                <h2 className='value'>${this.state.miles > 20 ? (this.state.miles - 20)*3+75: 75}</h2>
                            </Col>
                    </Row>
                </Grid>
            </div>
        )
    }

	
  
    render() {


        var deliveryCharge;
        
        <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5dghHLGthtmgmyEmUnhNv0bajvm5pP5A&callback=initMap">
        </script>

      return ( 
            <div className="homepageQuoteContainer" style={{maxHeight: "950px", minHeight: "950px"}}>

                {!this.state.generated? this.form() : this.results()}

            </div>
        )
    }
  }
  
  export default homeQuote;