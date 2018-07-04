/* eslint-disable no-undef */

import React, { Component} from 'react'
import './styles.css'
import {Link} from 'react-router-dom'
import container1 from '../images/container1.jpg'
import container2 from '../images/container1.jpg'



class Size extends Component {
	constructor(props) {
        super(props);
		this.state={
            size: "",
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

    handle20Selection =()=>{
        this.setState({size: "20"})
        document.getElementById("container16").setAttribute("style", "display: none; transition: all 1s ease");
        document.getElementById("20image").setAttribute("style", "transition: all 1s ease; width: 25%; border: 5px solid white; border-radius: 5px; margin-top: 1%");
    }

    handle16Selection =()=>{
        this.setState({size: "16"})
        document.getElementById("container20").setAttribute("style", "display: none; transition: all 1s ease");
        document.getElementById("16image").setAttribute("style", "transition: all 1s ease; width: 25%; border: 5px solid white; border-radius: 5px; margin-top: 1%");
    }
   
    render(props) {

      return ( 
                <div style={{backgroundImage: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)", minHeight: "100vh", marginTop: "-2%"}}>
                    <div><h1 className='title' style={{paddingTop: "10%"}}>Which Container Size Do You Need?</h1></div>
                    
                    <div style={{display: "flex"}}>
                        <div id='container16' onClick={this.handle16Selection} style={{flex: "1", cursor: "pointer", fontSize: "2.2rem", color: "white"}} name='size' value='16'>16 Foot Container<br/><br/><img src={container1} id='16image' style={{width: "60%", borderRadius: "5px", border: "5px solid white"}}/></div>
                        <div id='container20' onClick={this.handle20Selection} style={{flex: "1", cursor: "pointer", fontSize: "2.2rem", color: "white"}} name='size' value='20'>20 Foot Container<br/><br/><img src={container2} id='20image' style={{width: "60%", borderRadius: "5px", border: "5px solid white"}}/></div>
                    </div>

                    <div style={{marginTop: "4%"}}>
                        <Link className='quoteLinkAbout' style={{color: "white"}} to={{ pathname: '/final', state: this.state, handleInputChange: this.handleInputChange}}>Next</Link>
                    </div>
                </div>
               
        )
    }
  }
  
  export default Size;