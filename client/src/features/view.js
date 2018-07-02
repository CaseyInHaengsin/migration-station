import React from 'react'
import './styles.css'
import image from '../images/adobe1.jpeg'


const Features = ()=>{
    return(
        <div style={{width: "47%", paddingLeft: "2%"}}>

            <h1 className='title' style={{color:"#E7BD8C"}}>What Makes Us Different?</h1>

            <div>

                <div style={{flex: "1", padding: "5%"}}>
                    <h3 className='featureTitle'><i class="fas fa-exclamation-circle" style={{color: "#E7BD8C"}}></i> More Space</h3>
                        <p style={{fontSize: "25px"}}>The largest container that Boingle Box offers has 29% more cubic feet than the leading competitors</p>
                    <h3 className='featureTitle'><i class="fas fa-exclamation-circle" style={{color: "#E7BD8C"}}></i> Padded Wheels</h3>
                        <p style={{fontSize: "25px"}}>Our delivery system includes padded wheels that allow us to smoothly roll the Boingle Box container onto your driveway</p>
                    <h3 className='featureTitle'><i class="fas fa-exclamation-circle" style={{color: "#E7BD8C"}}></i> Locally Owned</h3>
                        <p style={{fontSize: "25px"}}>All of our locations are locally owned by individuals right here in the valley.</p>
                    <h3 className='featureTitle'><i class="fas fa-exclamation-circle" style={{color: "#E7BD8C"}}></i> Smooth Interior</h3>
                        <p style={{fontSize: "25px"}}>None of the Boingle Box containers have porous treated lumber walls that run a higher risk of splintering or holding odor than smooth-coated steel</p>
                </div>
                
                {/* <div style={{flex: "2"}}>
                    <img className="image" src={image}/>
                </div> */}

            </div>

        </div>
    )
}

export default Features;