import React, { Component } from 'react';
import SplashPage from './splashPage/view'
import About from './about/view'




class HomePage extends Component {


    render() {
  
      return (
          <div style={{scrollBehavior: "smooth" }}>
              <SplashPage/>
              <About/>
          </div>
      );
    }
  }
  
  export default HomePage;