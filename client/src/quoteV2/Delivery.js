/* eslint-disable no-undef */

import React, { Component} from 'react'
import './styles.css'
import {Link} from 'react-router-dom'



class Delivery extends Component {
	constructor(props) {
        super(props);
		this.state={
            delivery: false,			
            deliveryAddress: "",
			deliveryCity: "",
			deliveryState: "",
            deliveryZipCode: "",
            trueDeliveryColor: "#34383D",
            falseDeliveryColor: "#34383D",
		}
		
    }

    componentDidMount () {
        var propInfo = this.props.location.state
        this.setState(propInfo)
    }

    handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
        });
    }
    
    handleDeliverTrue =()=>{
        this.setState({delivery: true, trueColor: "#54B172", falseColor: "#34383D"})
        document.getElementById("deliverTrue").setAttribute("style", "display: none; transition: all 1s ease");
        document.getElementById("deliverFalse").setAttribute("style", "display: none; transition: all 1s ease");
    }

    handleDeliverFalse =()=>{
        this.setState({delivery: false, falseColor: "#54B172", trueColor: "#34383D"})
        document.getElementById("deliverTrue").setAttribute("style", "display: none; transition: all 1s ease");
        document.getElementById("deliverFalse").setAttribute("style", "display: none; transition: all 1s ease");
    }

    secondAddress=()=>{
        return(
            <div style={{padding: "0 20% 0 20%"}}> 
            <div>
                <label>Delivery Address</label>
                <input name='deliveryAddress' onChange={this.handleInputChange}></input>
            </div>

            <div>
                <label>Delivery City</label>
                <input name='deliveryCity' onChange={this.handleInputChange}></input>
            </div>

            <div>
                <label>Delivery State</label>
                <input name='deliveryState' onChange={this.handleInputChange}></input>
            </div>

            <div>
                <label>Delivery Zip Code</label>
                <input name='deliveryZipCode' onChange={this.handleInputChange}></input>
            </div>
        </div>
        )
    }

  
    render(props) {

      return ( 
                <div style={{backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)", minHeight: "100vh", marginTop: "-2%"}}>
                    <div><h1 className='title' style={{paddingTop: "10%"}}>Do You Want Us To Deliver The Container To A New Address?</h1></div>
                    <div><p>When you are finished loading your belongings or ready for the container to be moved from on location to another, we can come and pick it up for you.</p></div>

                    <div id='deliverFalse' onClick={this.handleDeliverFalse} className='storageOptions' style={{color: this.state.falseDeliveryColor, paddingTop: "50px"}}>No</div> 
                    <div id='deliverTrue' onClick={this.handleDeliverTrue} className='storageOptions'  style={{color: this.state.trueDeliveryColor, paddingTop: "15px"}}>Yes</div>   

                    {this.state.delivery ? this.secondAddress() : null }

                    <div style={{marginTop: "8%"}}>
                        <Link className='quoteLinkAbout' style={{color: "white"}} to={{ pathname: '/size', state: this.state, handleInputChange: this.handleInputChange}}>Next</Link>
                    </div>
                </div>
               
        )
    }
  }
  
  export default Delivery;