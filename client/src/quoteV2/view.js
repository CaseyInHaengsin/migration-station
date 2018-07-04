/* eslint-disable no-undef */

import React, { Component} from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import './styles.css'
import {Link} from 'react-router-dom'
import ScrollAnimation from 'react-animate-on-scroll';



class QuoteV2 extends Component {
	constructor(props) {
        super(props);
		this.state={
            dropAddress: "",
			dropCity: "",
			dropState: "",
            dropZipCode: "",
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
    
  
    render(props) {

      return ( 
                <div style={{backgroundImage: "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)", height: "100vh", marginTop: "-2%"}}>
                    <div><h1 className='title' style={{paddingTop: "5%"}}>Drop Off Address</h1></div>
                    <div><p>The Address that we will dropping the container off at for you to load your belongings</p></div>
                    
                    <div style={{padding: "0 20% 0 20%"}}> 
                        <div>
                            <label>Address</label>
                            <input name='dropAddress' onChange={this.handleInputChange}></input>
                        </div>

                        <div>
                            <label>City</label>
                            <input name='dropCity' onChange={this.handleInputChange}></input>
                        </div>

                        <div>
                            <label>State</label>
                            <input name='dropState' onChange={this.handleInputChange}></input>
                        </div>

                        <div>
                            <label>Zip Code</label>
                            <input name='dropZipCode' onChange={this.handleInputChange}></input>
                        </div>
                    </div>

                    <div style={{marginTop: "5%"}}>
                        <Link className='quoteLinkAbout' style={{marginTop: "3%", color: "#E7BD8C"}} to={{ pathname: '/storage', state: this.state}}>Next</Link>
                    </div>

                </div>
               
        )
    }
  }
  
  export default QuoteV2;