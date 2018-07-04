import React from 'react'




const Quotebox =(props)=>{
    console.log(props)

    const delivery =()=>{
        return(
            <div style={{display: "flex", padding: "1% 5% 1% 5%"}}>
                <div style={{flex: "1"}}>Delivery and Pick Up Fees: </div>
                <div style={{flex: "1", textAlign: "right"}}> ${props.state.deliveryFee * 2}</div>
            </div>
        )
    }

    const boingleStorage =()=>{
        return(
            <div style={{display: "flex", padding: "1% 5% 1% 5%"}}>
                <div style={{flex: "1"}}>Monthly Container Rent:</div>
                <div style={{flex: "1", textAlign: "right"}}>${props.state.container === 20 ? 199 : 179}</div>
            </div>
        )
    }

    const selfStorage =()=>{
        return(
            <div style={{display: "flex", padding: "1% 5% 1% 5%"}}>
                <div style={{flex: "1"}}>Monthly Container Rent:</div>
                <div style={{flex: "1", textAlign: "right"}}>${props.state.container === 20 ? 199 : 179}</div>
            </div>
        )
    }


    return(
        <div style={{height: "100%", marginRight: "10%", backgroundColor: "#34383D", borderRadius: "10px", color: "white", fontSize: "1.4rem"}}>

            <div style={{display: "flex", padding: "5% 5% 1% 5%"}}>
                <div style={{flex: "1"}}>Container Size:</div>
                <div style={{flex: "1", textAlign: "right"}}>{props.state.size} Foot Container</div>
            </div>

            {props.state.boingleStorage ? boingleStorage() : selfStorage()}

            <div style={{display: "flex", padding: "1% 5% 1% 5%"}}>
                <div style={{flex: "1"}}>Drop Off and Pick Up Fees: </div>
                <div style={{flex: "1", textAlign: "right"}}> ${props.state.dropOffFee * 2}</div>
            </div>

            {props.state.delivery ? delivery() : null}
            
        </div>
    )
}

export default Quotebox