/* eslint-disable no-undef */

import React, { Component} from 'react'
import './styles.css'
import {Link} from 'react-router-dom'
import container1 from '../images/container1.jpg'
import container2 from '../images/container1.jpg'
import Quotebox from './QuoteBox'



class Size extends Component {
	constructor(props) {
        super(props);
		this.state={
            deliveryMiles: "",
            dropOffMiles: "",
            dropOffFee: "",
            deliveryFee: ""
		}
		
    }


    componentDidMount () {
        var propInfo = this.props.location.state
        this.setState(propInfo)
        this.getMapInfo()
    }

    handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
        });
    }

    email = () => {
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

        var that            = this
        var origin1         = '22 east 1500 south, American Fork,UT';
        var destinationA    = this.props.location.state.dropAddress + this.props.location.state.dropCity + ',' + this.props.location.state.dropState
        var destinationB    = this.props.location.state.deliveryAddress + this.props.location.state.deliveryCity + ',' + this.props.location.state.deliveryState
        var service         = new google.maps.DistanceMatrixService;

        service.getDistanceMatrix({
          origins: [origin1],
          destinations: [destinationA, destinationB],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {

            var dropOffMilesText    = response.rows[0].elements[0].distance.text;
                dropOffMilesText    = dropOffMilesText.slice(0,4)
            var dropOffMiles        = parseInt(dropOffMilesText)

            if(dropOffMiles>20){
                var dropOffFee = (dropOffMiles - 20)*3+75;
            }else{
                var dropOffFee = 75
            }

            if(that.props.location.state.delivery){

                var deliveryMilesText = response.rows[0].elements[1].distance.text;
                    deliveryMilesText = deliveryMilesText.slice(0,4)
                var deliveryMiles     = parseInt(deliveryMilesText)

                if(deliveryMiles > 20){
                    var deliveryFee = (deliveryMiles - 20)*4+75;
                }else{
                    var deliveryFee = 75
                }

                that.setState({
                    deliveryMiles: deliveryMiles,
                    deliveryFee: deliveryFee,
                })

            }

            that.setState({
                dropOffMiles: dropOffMiles,
                dropOffFee: dropOffFee,
            })

        });

      }

      deliveryAddress=()=>{
          return(
                <div style={{marginTop: "50px"}}>
                    <p style={{color: "#34383D"}}>Second Delivery Address</p>
                    <h2 style={{fontSize: "2rem", color: "white", marginTop: "-20px"}}>{this.state.deliveryAddress +" "+ this.state.deliveryCity + ', ' + this.state.deliveryState}</h2>
                    <h2 style={{fontSize: "1.5rem", marginTop: "-20px"}}>{this.state.deliveryMiles} Miles From Store</h2>
                    <h2 style={{fontSize: "1.5rem", marginTop: "-20px"}}>${this.state.deliveryFee} Delivery Fee</h2>
                </div>
          )
      }

   
    render(props) {

        <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5dghHLGthtmgmyEmUnhNv0bajvm5pP5A&callback=initMap">
        </script>

      return ( 
                <div style={{backgroundImage: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)", minHeight: "100vh", marginTop: "-2%"}}>

                    <h1 className='title' style={{paddingTop: "5%"}}>Your Boingle Box Quote</h1>

                    <div style={{display: "flex", paddingTop: "30px"}}>
                    
                        <div style={{flex: "1"}} className='personalInfo'>

                            <p style={{color: "#34383D"}}>Personal Info</p>
                            <h2 style={{fontSize: "2.8rem", color: "white", marginTop: "-20px"}}>{this.state.firstName} {this.state.lastName}</h2>
                            <h2 style={{fontSize: "1.5rem", marginTop: "-20px"}}>{this.state.email}</h2>
                            <h2 style={{fontSize: "1.5rem", marginTop: "-20px"}}>{this.state.phoneNumber}</h2>
                            <br/>

                            <p style={{color: "#34383D"}}>First Drop Off Address</p>
                            <h2 style={{fontSize: "2rem", color: "white", marginTop: "-20px"}}>{this.state.dropAddress +" "+ this.state.dropCity + ', ' + this.state.dropState}</h2>
                            <h2 style={{fontSize: "1.5rem", marginTop: "-20px"}}>{this.state.dropOffMiles} Miles From Store</h2>
                            <h2 style={{fontSize: "1.5rem", marginTop: "-20px"}}>${this.state.dropOffFee} Drop Off Fee</h2>

                            {this.state.delivery?this.deliveryAddress():null}
                        </div>


                        <div style={{flex: "1"}} className='quoteBoxContainer'>
                        
                            <Quotebox state={this.state}/>

                        </div>
                
                </div>

                    {/* <div style={{paddingTop: "10%"}}>
                        <div>First Name: {this.state.firstName}</div>
                        <div>Last Name: {this.state.lastName}</div>
                        <div>Email: {this.state.email}</div>
                        <div>Phone: {this.state.phoneNumber}</div>
                        <div>Storing at Boingle?: {this.state.boingleStorage ? "True" : "False"}</div>
                        <div>Delivering To New Address?: {this.state.delivery ? "True" : "False"}</div>
                        <div>Container Size: {this.state.size}</div>
                        <div>Drop Off Date: {this.state.dropDate}</div>
                        <div>Months Storing: {this.state.duration}</div>
                        <div>Drop Off: {this.state.dropAddress +" "+ this.state.dropCity + ',' + this.state.dropState}</div>
                        <div>Delivery: {this.state.deliveryAddress +" "+ this.state.deliveryCity + ',' + this.state.deliveryState}</div>
                        <div>dropOffMiles: {this.state.dropOffMiles}</div>
                        <div>dropOffFee: {this.state.dropOffFee}</div>
                        <div>deliveryMiles: {this.state.deliveryMiles}</div>
                        <div>deliveryFee: {this.state.deliveryFee}</div>
                    </div> */}

                </div>
               
        )
    }
  }
  
  export default Size;