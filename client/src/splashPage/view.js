import React, { Component } from 'react';
import './styles.css'
import logoSmall from '../images/logo-1.png'

//https://www.muicss.com/docs/v1/react/introduction



class SplashPage extends Component {


    render() {
  
      return (
          <div className='splash-page-container'>
            <div className='title-container'>

                <h1 className='title'>Marina Cove</h1>
                <h1 className='sub-title'>Storage</h1>

                <a href='#about-container'><div className="buttonContainer">
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <span className="text">Scroll down</span>
                </div>
                </a>

            </div>

          </div>

      );
    }
  }
  
  export default SplashPage;