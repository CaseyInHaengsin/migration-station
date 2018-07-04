/* eslint-disable no-undef */

import React, { Component} from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import './styles.css'
import {Link} from 'react-router-dom'
import ScrollAnimation from 'react-animate-on-scroll';



class Storage extends Component {
	constructor(props) {
        super(props);
		this.state={
            boingleStorage: false,			
            deliveryAddress: "",
			deliveryCity: "",
			deliveryState: "",
            deliveryZipCode: "",
            trueColor: "#34383D",
            falseColor: "#34383D",
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

        console.log(this.state)
    }
    
    handleStorageTrue =()=>{
        this.setState({boingleStorage: true, trueColor: "#54B172", falseColor: "#34383D"})
        document.getElementById("storageFalse").setAttribute("style", "opacity: 0; transition: all 1s ease");
    }

    handleStorageFalse =()=>{
        this.setState({boingleStorage: false, falseColor: "#54B172", trueColor: "#34383D"})
        document.getElementById("storageTrue").setAttribute("style", "opacity: 0; transition: all 1s ease");
    }

  
    render(props) {

      return ( 
                <div style={{backgroundImage: "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)", height: "100vh", marginTop: "-2%"}}>
                    <div><h1 className='title' style={{paddingTop: "10%"}}>Will You Store the container at our facilities or at yours?</h1></div>
                    <div><p>Boingle Box will charge a monthly delivery fee to store out our location, however storing at your own is free.</p></div>

                    <div id='storageFalse' onClick={this.handleStorageFalse} className='storageOptions' style={{color: this.state.falseColor, paddingTop: "50px"}}>Store St My House Or Place Of Business</div> 
                    <div id='storageTrue' onClick={this.handleStorageTrue} className='storageOptions'  style={{color: this.state.trueColor, paddingTop: "15px"}}>Store At Boingle Box's Secure Facilities</div>   

                    <div style={{marginTop: "8%"}}>
                        <Link className='quoteLinkAbout' style={{color: "#E7BD8C"}} to={{ pathname: '/delivery', state: this.state, handleInputChange: this.handleInputChange}}>Next</Link>
                    </div>
                </div>
               
        )
    }
  }
  
  export default Storage;