import React from 'react'
import './styles.css'
import signImage from '../images/sign.png'
import signImage2 from '../images/bannerBackground4.png'
import {Link} from 'react-router-dom'


const Prices =()=>{
    return(
            <div className="pricesContainer" style ={{marginTop: "-5%"}}>
                <div style={{width: "50%", marginTop: "2%"}}>
                    <div>
                        <h1 className='pricesTitle'>So How Does It Work?</h1>

                        <div className='steps'><i class="fas fa-truck-moving fa-2x"></i> We Deliver the Container to your location</div>

                        <div className='steps'><i class="fas fa-box-open fa-2x"></i> You Pack up all of your belongings</div>

                        <div className='steps'><i class="fas fa-truck-loading fa-2x"></i> You Load your portable storage container</div>

                        <div className='steps'><i class="fas fa-truck-moving fa-2x"></i> We move it to the next location</div>

                        {/* <p className='prices-content'>Simple.  We really break it down into three easy steps.  First, you have the storage container delivered to your home, place of business... or wherever!  Second, 
                        load the container with as much of your belongings as you can.  Third, we come and pick it up when you are finished.
                        </p>

                        <p className='prices-content'>Whenever you are ready for your belongings again, we will deliver it to your new address.  No need for countless trips to and from your storage unit.</p>
                            <br/> */}
                    </div>

                    {/* <div>
                        <img src={signImage2} className='signImage'/>
                    </div> */}
                </div>

            </div>

    )
}

export default Prices