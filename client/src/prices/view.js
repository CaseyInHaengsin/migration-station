import React from 'react'
import './styles.css'


const Prices =()=>{
    return(
            <div className="pricesContainer" style ={{marginTop: "-5%"}}>
                <div style={{width: "50%", marginTop: "10%"}}>
                    <div>
                        <h1 className='pricesTitle'>How Does It Work?</h1>

                        <div className='steps'>We Deliver</div>
                        <p className='steps-content' style={{paddingLeft: "20%"}}>We deliver the storage container where ever you need it.</p>

                        <div className='steps' style={{paddingLeft: "15%"}}>You You Load It</div>
                        <p className='steps-content' style={{paddingLeft: "30%"}}>You load your container at your convenience.  No need for countless trips.</p>

                        <div className='steps' style={{paddingLeft: "25%"}}>We Pick It Up</div>
                        <p className='steps-content' style={{paddingLeft: "41%"}}>We'll pick up the container when you're finished loading it.</p>

                        <div className='steps' style={{paddingLeft: "35%"}}>We Store It</div>
                        <p className='steps-content' style={{paddingLeft: "51%"}}>You can either have us store it at our secure facilities or wherever is easiest for you.</p>

                    </div>

                </div>

            </div>

    )
}

export default Prices