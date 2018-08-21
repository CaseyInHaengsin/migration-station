/* eslint-disable no-undef */

import React, { Component} from 'react'
import { Container, Form, Input, Textarea, Button } from 'muicss/react';
import './styles.css'

 import axios from 'axios'



class ContactForm extends Component {
	constructor(props) {
        super(props);
		this.state={
            username: "",
            password: ""
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

        axios.post('api/user-login', this.state)
          .then(function (response) {

            if(response.data === true){
                console.log("AUTHENTICATED!")
            }else{
                console.log(response.data)
            }

          })

          .catch(function (error) {

            console.log(error);

          });
    }

    render() {

      return ( 

            <Container id='login-form'>

                <div className='super-title' style={{color: "#EFCB6E"}}>Login</div>

                <Form>
                    <Input placeholder="Username"  name='username' onChange={this.handleInputChange}/>
                    <Input placeholder="Password"  name='password' onChange={this.handleInputChange}/>
                </Form>

                 <Button variant="raised" onClick={this.handleSubmit} style={{backgroundColor: "#75A0A4", color: "white"}}>Submit</Button>

            </Container>
               
        )
    }
  }
  
  export default ContactForm;