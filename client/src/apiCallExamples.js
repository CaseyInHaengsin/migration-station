import React, { Component } from 'react';
import axios from 'axios'




class HomePage extends Component {

  submitUser =()=>{
    axios.post('api/user', {
      firstName: 'Fred',
      lastName: 'Flintstone',
      email: "email.test15@test.com"
    })
    .then(function (response) {

      console.log(response.data);

    }).catch(function (error) { console.log(error) })
  }
  
    getUsers =()=>{
        axios.get('api/user')
        .then(function (response) {
  
          console.log(response.data);
  
        }).catch(function (error) { console.log(error) })
      }

  submitAppointment =()=>{
    axios.post('api/appointments', {
      date: "1/1/18",
      dueDate: "1/1/18",
      license: "12DF 345",
      status: "Not Started",
      user: "5b6e614a27e15c0d42f0d95a",
    })
    .then(function (response) {

      console.log(response.data);

    }).catch(function (error) { console.log(error) })
  }



    getAppointments =()=>{
      axios.get('api/appointments')
      .then(function (response) {

        console.log(response.data);

      }).catch(function (error) { console.log(error) })
    }



    render() {
  
      return (
          <div>
            <button onClick={this.submitUser} style={{backgroundColor: "red"}}>POST USER</button>
            <button onClick={this.getUsers} style={{backgroundColor: "red"}}>GET USER</button>
            <button onClick={this.submitAppointment} style={{backgroundColor: "green"}}>POST APPOINTMENT</button>
            <button onClick={this.getAppointments} style={{backgroundColor: "green"}}>GET APPOINTMENT</button>
          </div>
      );
    }
  }
  
  export default HomePage;