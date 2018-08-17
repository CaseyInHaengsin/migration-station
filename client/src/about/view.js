import React, {Component} from 'react'
import './styles.css'
import Navbar from './Navbar';
import Services from './Services'

class About extends Component {


    render() {
  

      return (
          <div className='about-container' id='about-container'>
            <Navbar/>
            <Services/>
        </div>

      );
    }
  }
  

export default About;