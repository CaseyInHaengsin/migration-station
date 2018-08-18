/* eslint-disable no-undef */

import React, { Component} from 'react'
import { Container, Form, Input, Textarea, Button } from 'muicss/react';
import './styles.css'

 import axios from 'axios'



class ContactForm extends Component {
	constructor(props) {
        super(props);
		this.state={
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
		}
    }

    handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
        });
    }

    handleSubmit = (event) =>{

        event.preventDefault();

        axios.post('/send-message', this.state)
          .then(function (response) {

            console.log(response);

          })

          .catch(function (error) {

            console.log(error);

          });
    }
    
  
    render() {

      return ( 

            <Container id='contact-form'>

                <div className='super-title' style={{color: "#EFCB6E"}}>Contact Us</div>

                <Form>
                    <Input placeholder="Your Name"  name='name' onChange={this.handleInputChange}/>
                    <Input placeholder="Email"  name='email' onChange={this.handleInputChange}/>
                    <Input placeholder="Phone Number" name='phone' onChange={this.handleInputChange} />
                    <Input placeholder="Subject"  name='subject' onChange={this.handleInputChange}/>
                    <Textarea placeholder="Message" name='message' onChange={this.handleInputChange} />
                </Form>

                 <Button variant="raised" onClick={this.handleSubmit} style={{backgroundColor: "#75A0A4", color: "white"}}>Send</Button>

            </Container>
               
        )
    }
  }
  
  export default ContactForm;