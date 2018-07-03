/* eslint-disable no-undef */

import React, { Component} from 'react'
import './styles.css'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom'
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
            miles1: 0,
            address2: "",
			city2: "",
			state2: "",
			zipCode2: "",
            miles2: 0,
            disabled: true,
            size: '20',
            errorMessage: "**All Fields Required Before Generating Your Quote",
            buttonText: "All Fields Required",
            delivery1: 75,
            delivery2: 75,
            generated: false,
            location2: false
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
          axios.post(`https://boinglebox.herokuapp.com/api/send-message`, info)
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
        var destinationA = this.state.address + this.state.city + ',' + this.state.state
        var destinationB = this.state.address2 + this.state.city2 + ',' + this.state.state2

        var service = new google.maps.DistanceMatrixService;

        service.getDistanceMatrix({
          origins: [origin1],
          destinations: [destinationA, destinationB],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {

            console.log(response)
            console.log(response.rows[0].elements[0].distance.text)

            var miles1Text = response.rows[0].elements[0].distance.text;
                miles1Text = miles1Text.slice(0,4)
            var value1 = parseInt(miles1Text)

            if(value1>20){
                var deliveryCharge1 = (value1 - 20)*3+75;
            }else{
                var deliveryCharge1 = 75
            }

            if(currentComponent.state.location2){

                var miles2Text = response.rows[0].elements[1].distance.text;
                    miles2Text = miles2Text.slice(0,4)
                var value2     = parseInt(miles2Text)

                if(value2 > 20){
                    var deliveryCharge2 = (value2 - 20)*3+75;
                }else{
                    var deliveryCharge2 = 75
                }

                currentComponent.setState({
                    miles2: value2,
                    delivery2: deliveryCharge2,
                })

            }

            currentComponent.setState({
                miles1: value1,
                generated: true,
                errorMessage: "Scroll Down for Quote Results",
                delivery1: deliveryCharge1,
            })

        });

        setTimeout(() => {
            this.handleSubmit()
        }, 6000);

      }

    handleToggle=()=>{
        if(this.state.location){
            this.setState({location2: false})
        }else{
            this.setState({location2: true})
        }
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

                        <Col xs={6}>
                            <label>Different Delivery location?</label>
                            <select type="text" name='location' onChange={this.handleToggle}>
                                    <option value='false'>No</option>
                                    <option value='true'>Yes</option>
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

    form2=()=>{

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
            <Grid fluid style={{width: "100%"}}>
                    <Row><Col xs={12}><h1 className='title'>Boingle Box</h1></Col></Row>
                    <Row><Col xs={12}><h1 className='subTitle'>Portable Storage Containers</h1></Col></Row>

                    <Row><Col xs={12}><h1   className='quoteHeader'>Second Location</h1></Col></Row>

                    <Row>

                        <Col xs={6}>
                        <label>Address</label>
                        <input name='address2' onChange={this.handleInputChange}></input>
                        </Col>

                        <Col xs={6}>
                        <label>City</label>
                        <input name='city2' onChange={this.handleInputChange}></input>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                        <label>State</label>
                        <input name='state2' onChange={this.handleInputChange}></input>
                        </Col>

                        <Col xs={6}>
                        <label>Zip Code</label>
                        <input name='zipCode2' onChange={this.handleInputChange}></input>
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

        return(

            <div>
                    <Grid style={{textAlign: "left", paddingLeft: "10%", marginTop: "2%"}}>
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
                                <h1 className='title quoteTitleFix'>Delivery Charges</h1>
                                <p className='description' style={{maxWidth: "50%"}}>Your total Delivery Charges cover Two "Drop offs" and 1 "Pick Up" to a single location.</p>
                                <br/>
                                <Grid style={{marginTop: "15px"}}>
                                    <Row>
                                        <Col xs={6}>
                                            <p className='description' style={{color: "#34383D"}}>Per Trip</p>
                                            <h2 className='value'>${this.state.delivery1}</h2>
                                        </Col>
                                        <Col xs={6} style={{paddingLeft: "35px"}}>
                                            <p className='description' style={{color: "#34383D"}}>Total Fees</p>
                                            <h2 className='value'>${this.state.delivery1*3}</h2>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Col>
                    </Row>
                </Grid>
            </div>
        )
    }

    results2=()=>{

        return(
                <div>
                    <Row>
                        <Col xs={12} md={12}>
                            <h1 className='title'>Miles From Store</h1>
                        </Col>

                        <Col xs={6}>
                            <p className='description' style={{color: "#34383D"}}>{this.state.zipCode}</p>
                            <h2 className='value'>{this.state.miles1}</h2>
                        </Col>

                        <Col xs={6} style={{paddingLeft: "35px"}}>
                            <p className='description' style={{color: "#34383D"}}>{this.state.zipCode2}</p>
                            <h2 className='value'>{this.state.miles2}</h2>
                        </Col>

                    </Row>

                    <Row style={{marginTop: "-8%"}}>

                        <Col xs={12} md={12}>
                            <h1 className='title quoteTitleFix'>Rent</h1>
                            <p className='description'>Your monthly rent based on the container size you chose</p>
                            <h2 className='value'>${this.state.size === 16? 179: 199}</h2>
                        </Col>

                    </Row>

                    <Row style={{marginTop: "-6%"}}>

                        <Col xs={12} md={12}>
                            <h1 className='title quoteTitleFix'>Delivery Charges</h1>
                            <br/>
                        </Col>
                    </Row>

                    <Row>

                        <Col xs={6}>
                            <p className='description' style={{color: "#34383D"}}>Address 1 Drop Off</p>
                            <h2 className='value'>${this.state.delivery1}</h2>
                        </Col>

                        <Col xs={6} style={{paddingLeft: "35px"}}>
                            <p className='description' style={{color: "#34383D"}}>Address 1 Pick Up</p>
                            <h2 className='value'>${this.state.delivery1}</h2>
                        </Col>

                    </Row>

                    <Row>

                        <Col xs={6}>
                            <p className='description' style={{color: "#34383D"}}>Address 2 Drop Off</p>
                            <h2 className='value'>${this.state.delivery2}</h2>
                        </Col>

                        <Col xs={6} style={{paddingLeft: "35px"}}>
                            <p className='description' style={{color: "#34383D"}}>Address 2 Pick Up</p>
                            <h2 className='value'>${this.state.delivery2}</h2>
                        </Col>

                    </Row>

                </div>
        )
    }

	
  
    render() {


        var deliveryCharge;
        
        <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5dghHLGthtmgmyEmUnhNv0bajvm5pP5A&callback=initMap">
        </script>

      return ( 
            <div className="homepageQuoteContainer">

                {!this.state.generated ? this.state.location2 ? this.form2():this.form() : this.state.location2 ? this.results2() : this.results()}


            </div>
        )
    }
  }
  
  export default homeQuote;