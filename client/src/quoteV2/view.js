/* eslint-disable no-undef */

import React, { Component} from 'react'
import './styles.css'
import {Link} from 'react-router-dom'
import ScrollAnimation from 'react-animate-on-scroll';



class QuoteV2 extends Component {
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
            delivery: ''
		}
		
    }

    componentDidMount () {
        const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD5dghHLGthtmgmyEmUnhNv0bajvm5pP5A&callback=initMap";
        script.async = true;

        document.body.appendChild(script);
    }
    

    getMapInfo=(event)=>{

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
                update: true,
                errorMessage: "Scroll Down for Quote Results"
            })

            console.log(currentComponent.state)

        });
      }

    

	 handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
        });

        this.buttonCheck()
    }
    
    validationCheck=(event)=>{
        event.preventDefault()

        console.log("performing validation check")

        if(this.state.firstName.length === 0){
            console.log('failed at position 1')

        }else if(this.state.lastName.length === 0){
            console.log('failed at position 2')

        }else if(this.state.phoneNumber.length === 0){
            console.log('failed at position 3')

        }else if(this.state.email.length === 0){
            console.log('failed at position 4')

        }else if(this.state.address.length === 0){
            console.log('failed at position 5')

        }else if(this.state.city.length === 0){
            console.log('failed at position 6')

        }else if(this.state.state.length === 0){
            console.log('failed at position 7')

        }else if(this.state.zipCode.length === 0){
            console.log('failed at position 8')
        
        }else{
            this.setState({disabled: false})
            this.getMapInfo()
        }
    }


    buttonCheck=(event)=>{
        if(!this.state.stop){
            console.log("performing button check")
            if(this.state.firstName.length === 0){
            }else if(this.state.lastName.length === 0){
            }else if(this.state.phoneNumber.length === 0){
            }else if(this.state.email.length === 0){
            }else if(this.state.address.length === 0){
            }else if(this.state.city.length === 0){
            }else if(this.state.state.length === 0){
            }else if(this.state.zipCode.length === 0){
            }else{
                this.setState({disabled: false, errorMessage: ""})
            }
        }
    }

	
  
    render() {


        var deliveryCharge;
        
        <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5dghHLGthtmgmyEmUnhNv0bajvm5pP5A&callback=initMap">
        </script>

      return ( 
            <div>
                <div className='quoteContainer' id="quote" style={{marginTop: "-2%"}}>

                    

                    <form  className="content bgcolor-1" style={{minHeight: "100vh"}}>

                    <ScrollAnimation animateIn="bounceInDown" duration={1.5}>
                        <Link to='/' style={{color: "white", fontSize: "20px", textDecoration: "none"}}>Go Back</Link>
                    </ScrollAnimation>

                    <ScrollAnimation animateIn="slideInLeft" duration={2}>
                        <h1 style={{color: "white"}}>Get A Quote</h1>
                        <p style={{color: "white"}}>Fill out the informaition below in order to get a quote sent to you including delivery costs and monthly storage fees.</p>
                    </ScrollAnimation>

                    <ScrollAnimation animateIn="bounceInUp" duration={2}>
                        <span className="input input--haruki">
                            <input className="input__field input__field--haruki" type="text" id="input-1" name='firstName' onChange={this.handleInputChange}/>
                            <label className="input__label input__label--haruki" for="input-1">
                                <span className="input__label-content input__label-content--haruki">First Name</span>
                            </label>
                        </span>

                        <span className="input input--haruki">
                            <input className="input__field input__field--haruki" type="text" id="input-2" name='lastName' onChange={this.handleInputChange}/>
                            <label className="input__label input__label--haruki" for="input-2">
                                <span className="input__label-content input__label-content--haruki">Last Name</span>
                            </label>
                        </span>

                        <br/>
                        
                        <span className="input input--haruki">
                            <input className="input__field input__field--haruki" type="text" id="input-3" name='email'onChange={this.handleInputChange}/>
                            <label className="input__label input__label--haruki" for="input-3">
                                <span className="input__label-content input__label-content--haruki">Email</span>
                            </label>
                        </span>

                        <span className="input input--haruki">
                            <input className="input__field input__field--haruki" type="text" id="input-4" name='phoneNumber' onChange={this.handleInputChange}/>
                            <label className="input__label input__label--haruki" for="input-3">
                                <span className="input__label-content input__label-content--haruki">Phone Number</span>
                            </label>
                        </span>
                    
                    <br/>

                        <span className="input input--haruki">
                            <input className="input__field input__field--haruki" type="text" id="input-5" name='address' onChange={this.handleInputChange}/>
                            <label className="input__label input__label--haruki" for="input-1">
                                <span className="input__label-content input__label-content--haruki">Address</span>
                            </label>
                        </span>

                        <span className="input input--haruki">
                            <input className="input__field input__field--haruki" type="text" id="input-6" name='city' onChange={this.handleInputChange}/>
                            <label className="input__label input__label--haruki" for="input-2">
                                <span className="input__label-content input__label-content--haruki">City</span>
                            </label>
                        </span>

                        <br/>

                        <span className="input input--haruki">
                            <input className="input__field input__field--haruki" type="text" id="input-7" name='state' onChange={this.handleInputChange}/>
                            <label className="input__label input__label--haruki" for="input-3">
                                <span className="input__label-content input__label-content--haruki">State</span>
                            </label>
                        </span>

                        <span className="input input--haruki">
                            <input className="input__field input__field--haruki" type="text" id="input-8" name='zipCode' onChange={this.handleInputChange}/>
                            <label className="input__label input__label--haruki" for="input-3">
                                <span className="input__label-content input__label-content--haruki">Zip Code</span>
                            </label>
                        </span>

                        <br/>

                        <span className="input input--haruki">

                            <select className="input__field input__field--haruki" type="text" id="input-9" name='size' onChange={this.handleInputChange}>
                                <option></option>
                                <option value="16">16 Foot</option>
                                <option value="20">20 Foot</option>
                            </select>
                            
                            <label className="input__label input__label--haruki" for="input-9">
                                <span className="input__label-content input__label-content--haruki">Container Size</span>
                            </label>
                        </span>
                        </ScrollAnimation>
                        
                        <br/>
                        <br/>
                        <p style={{color: "white"}}>{this.state.errorMessage}</p>
                        <button disabled={this.state.disabled} className='generateQuote' onClick={this.validationCheck} style={{marginBottom: "5%"}}>Generate Quote</button>

                    </form>

                        <div style={{backgroundColor: 'white', textAlign: "center"}}>
                        <p style={{textAlign: "center", color: "#44525F", paddingTop: "5%"}}>The information below is an estimated cost for your delivery and monthly rent for your containers.  For an exact price, please contact the store at 801-900-4528 or 1-844-BOINGLE (844-264-6453).</p>
                            
                            <div style={{display: "flex", paddingTop: "1%"}}>
                            
                    
                                <div style={{flex: "1"}}>
                                    <ScrollAnimation animateIn="slideInLeft" duration={1}>
                                        <h1 id='quoteResults' className='title'>Distance</h1>
                                        <p style={{color: "#F6921E"}}>Your distance from the store helps determine your delivery charge</p>
                                        <p className='mapResults'>{this.state.miles} Miles</p>
                                    </ScrollAnimation>
                                </div>
                            

                            
                                <div style={{flex: "1"}}>
                                    <ScrollAnimation animateIn="bounceInUp" duration={2}>
                                        <h1 className='title'>Rent</h1>
                                        <p style={{color: "#F6921E"}}>Your Monthly Cost is based off the {this.state.size} foot container you chose</p>
                                        <p value='199' className='mapResults'>${this.state.size === "16" ? 179 : 199}</p>
                                    </ScrollAnimation>
                                </div>
                            

                            
                                <div style={{flex: "1"}}>
                                    <ScrollAnimation animateIn="slideInRight" duration={1}>
                                        <h1 className='title'>Delivery</h1>
                                        <p style={{color: "#F6921E"}}>This is your one time delivery charge to drop off the container</p>
                                        <p className='mapResults'>${this.state.miles < 20? deliveryCharge = 75:  deliveryCharge = ((this.state.miles-20)*3)+75}</p>
                                    </ScrollAnimation>
                                </div>
                            

                            </div>

                            <form method="POST" action="https://formspree.io/Parkwaystoragecenter@gmail.com">
                                <span className="input input--haruki" style={{display: "none"}}>
                                    <input className="input__field input__field--haruki" type="text" id="input-1" name='first Name' value={this.state.firstName}/>
                                </span>
                                <span className="input input--haruki" style={{display: "none"}}>
                                    <input className="input__field input__field--haruki" type="text" id="input-2" name='last Name' value={this.state.lastName}/>
                                </span>
                                <span className="input input--haruki" style={{display: "none"}}>
                                    <input className="input__field input__field--haruki" type="text" id="input-3" name='email'value={this.state.email}/>
                                </span>
                                <span className="input input--haruki" style={{display: "none"}}>
                                    <input className="input__field input__field--haruki" type="text" id="input-4" name='phone Number' value={this.state.phoneNumber}/>
                                </span>
                                <span className="input input--haruki" style={{display: "none"}}>
                                    <input className="input__field input__field--haruki" type="text" id="input-5" name='address' value={this.state.address}/>
                                </span>
                                <span className="input input--haruki" style={{display: "none"}}>
                                    <input className="input__field input__field--haruki" type="text" id="input-6" name='city' value={this.state.city}/>
                                </span>
                                <span className="input input--haruki" style={{display: "none"}}>
                                    <input className="input__field input__field--haruki" type="text" id="input-7" name='state' value={this.state.state}/>
                                </span>

                                <span className="input input--haruki" style={{display: "none"}}>
                                    <input className="input__field input__field--haruki" type="text" id="input-8" name='zip Code' value={this.state.zipCode}/>
                                </span>

                                <span className="input input--haruki" style={{display: "none"}}>
                                    <input className="input__field input__field--haruki" type="text" id="input-8" name='container Size' value={this.state.size}/>
                                </span>

                                <span className="input input--haruki" style={{display: "none"}}>
                                    <input className="input__field input__field--haruki" type="text" id="input-8" name='Distance From Store' value={this.state.miles}/>
                                </span>

                                <span className="input input--haruki" style={{display: "none"}}>
                                    <input className="input__field input__field--haruki" type="text" id="input-8" name='Delivery Charge' value={deliveryCharge}/>
                                </span>
                                
                                <input type="hidden" name="_subject" value="New Quote!" />
                                <input type="text" name="_gotcha" style={{display: "none"}} />
                                <input type="hidden" name="_next" value="http://www.boinglebox.com/" />

                                    <button className='generateQuote' type='submit' style={{color: "#5F6E7E"}}>Finalize Quote</button>

                                <br/>
                                <br/>
                                <br/>
                                <br/>
                        </form>

                        </div>
                </div>
			</div>
        )
    }
  }
  
  export default QuoteV2;