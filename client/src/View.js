import React, { Component } from 'react';
import axios from 'axios'




class HomePage extends Component {

  submit =()=>{
    axios.post('api/user', {
      firstName: 'Fred',
      lastName: 'Flintstone',
      email: "email.test1@test.com"
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    render() {
  
      return (
          <div>
            <button onClick={this.submit} style={{backgroundColor: "red"}}>TEST</button>
          </div>
      );
    }
  }
  
  export default HomePage;