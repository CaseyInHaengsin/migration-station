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

    }
    

    

	 handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
        });
    }
    
  
    render() {


        <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5dghHLGthtmgmyEmUnhNv0bajvm5pP5A&callback=initMap">
        </script>

      return ( 
            <div>
               
			</div>
        )
    }
  }
  
  export default QuoteV2;