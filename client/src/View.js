import React, { Component } from 'react';
import SplashPage from './splashPage/view'
import About from './about/view'
import ContactForm from './contact/view'
import Break from './global/Break'
import Footer from './global/Footer'


class HomePage extends Component {


    render() {
  
      return (
          <div style={{scrollBehavior: "smooth" }}>
              <SplashPage/>
              <About/>
              <ContactForm/>
              <Footer/>
          </div>
      );
    }
  }
  
  export default HomePage;