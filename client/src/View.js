import React, { Component } from 'react';
import Parallax from 'react-springy-parallax'
import About from './about/view'
import Prices from './prices/view'
import baloon from './images/balloon.png'
import cloud from './images/cloud.png'
import sky from './images/sky.jpg'
import background from './images/adobe1.jpeg'
import Features from './features/view'
import Reviews from './reviews/view'
import ScrollAnimation from 'react-animate-on-scroll';
import HomepageQuote from './homepageQuote/view'



class HomePage extends Component {


    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })
    render() {
      const styles = {
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }
  
      const backgroundStyles={
            background: `url(${sky}) no-repeat bottom center`,
            webkitBackgroundSize: "cover",
            mozBackgroundSize: "cover",
            oBackgroundSize: "cover",
            backgroundSize: "cover",
            height: "100vh"
        }


        const backgroundStyles2={
          background: `url(${background}) no-repeat bottom center`,
          webkitBackgroundSize: "cover",
          mozBackgroundSize: "cover",
          oBackgroundSize: "cover",
          backgroundSize: "cover",
          height: "120vh"
      }

      const backgroundStyles3={
        
        height: "120vh"
    }
  
  
      return (
      <Parallax ref='parallax' pages={5.2} style={{backgroundColor: "white"}}>
  
        <Parallax.Layer offset={0} speed={0} style={backgroundStyles} className='hide-on-med-and-up' />
          
          <Parallax.Layer
            className='hide-on-mobile'
            offset={0}
            speed={0}
          >            

            <Parallax.Layer
              className='cloud1'
              offset={0.1}
              speed={0.9}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
              >
              <ScrollAnimation animateIn="slideInRight" duration={20}>
                  <img src={cloud} />
              </ScrollAnimation>

            </Parallax.Layer>

            <Parallax.Layer
              className='cloud1'
              offset={-0.1}
              speed={-0.9}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
              >
            <ScrollAnimation animateIn="slideInRight" duration={20}>
                  <img src={cloud} />
              </ScrollAnimation>

            </Parallax.Layer>



            <Parallax.Layer
              className='cloud2'
              offset={0.0}
              speed={0.2}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
              >
              <ScrollAnimation animateIn="slideInLeft" duration={20}>
                  <img src={cloud} />
              </ScrollAnimation>
            </Parallax.Layer>


            <Parallax.Layer
              className='cloud3'
              offset={0}
              speed={-0.2}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
              >
              <ScrollAnimation animateIn="slideInLeft" duration={20}>
                  <img src={cloud} />
              </ScrollAnimation>
            </Parallax.Layer>


                        <Parallax.Layer
              className='cloud1'
              offset={1}
              speed={0.4}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
              >
              <ScrollAnimation animateIn="slideInLeft" duration={20}>
                  <img src={cloud} />
              </ScrollAnimation>
            </Parallax.Layer>



            <Parallax.Layer
              className='cloud4'
              offset={0.9}
              speed={0.01}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
              >
              <ScrollAnimation animateIn="slideInLeft" duration={20}>
                  <img src={cloud} />
              </ScrollAnimation>
            </Parallax.Layer>



            <Parallax.Layer
              className='cloud6'
              offset={0.6}
              speed={0.01}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
              >
              <ScrollAnimation animateIn="slideInRight" duration={20}>
                  <img src={cloud} />
              </ScrollAnimation>
            </Parallax.Layer>


            <Parallax.Layer
              className='cloud5'
              offset={-0.5}
              speed={-0.1}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
              >
              <ScrollAnimation animateIn="slideInRight" duration={20}>
                  <img src={cloud} />
              </ScrollAnimation>
            </Parallax.Layer>


            <Parallax.Layer
              className='cloud1'
              offset={-0.5}
              speed={-0.1}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
              >
              <ScrollAnimation animateIn="slideInRight" duration={20}>
                  <img src={cloud} />
              </ScrollAnimation>
            </Parallax.Layer>


            <Parallax.Layer
              className='cloud3'
              offset={-0.4}
              speed={-0.1}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
              >
              <ScrollAnimation animateIn="slideInRight" duration={20}>
                  <img src={cloud} />
              </ScrollAnimation>
            </Parallax.Layer>

          </Parallax.Layer>



            <Parallax.Layer
              offset={1}
              speed={0}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: "100%" }}
              >
                  <About />
            </Parallax.Layer>

            <Parallax.Layer
              offset={2.1}
              speed={0.1}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
              >
              <ScrollAnimation animateIn="slideInLeft" duration={1}>
                  <Prices />
              </ScrollAnimation>
            </Parallax.Layer>

            <Parallax.Layer
              offset={3.3}
              speed={0}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginLeft: "6.5%" }}
              >
              <ScrollAnimation animateIn="slideInLeft" duration={1}>
                  <Features />
              </ScrollAnimation>
            </Parallax.Layer>

            <Parallax.Layer
              offset={4.3}
              speed={.5}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}
              >
              <ScrollAnimation animateIn="slideInLeft" duration={1}>
                  <Reviews />
              </ScrollAnimation>
            </Parallax.Layer>

            <Parallax.Layer
              className='balloon'
              offset={0.03}
              speed={-0.1}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}
              >
              <ScrollAnimation animateIn="slideInUp" duration={4}>
                  <img src={baloon} style={{width: "90%"}}/>
              </ScrollAnimation>

            </Parallax.Layer>

            <Parallax.Layer
              offset={0}
              speed={-1}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: "50%", marginLeft: "57%",}}
              >
              <ScrollAnimation animateIn="slideInRight" duration={2}>
                  <HomepageQuote />
              </ScrollAnimation>
            </Parallax.Layer>


        </Parallax>
      );
    }
  }
  
  export default HomePage;