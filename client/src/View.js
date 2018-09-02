import React, { Component } from 'react';
import Navbar from './Modules/global/navbar/View'
import Projects from './Modules/projects/View'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        auth:'',
        code: '',
    };
}

    render() {
  
      return (
        <div style={{scrollBehavior: "smooth" }}>
          <Navbar/>
          <Projects/>
        </div>
      );
    }
  }
  
  export default HomePage;