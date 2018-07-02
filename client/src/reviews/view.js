import React from 'react'
import './styles.css'
import { Grid, Row, Col } from 'react-flexbox-grid';

const Reviews =()=>{
    return(
        <div className='reviewsContainer'>

        <Grid>
            <Row>
                <Col sm={5}>
                    <div className='reviews'>

                            <div className='review'>
                                    <br/>
                                    <br/>
                                    <br/>
                                <h4 className='reviewTitle'>"Excellent Service, best way to move"</h4>
                                <p className='reviewContent'>It is easy to load and the floor is nice to protect your furniture. This was the best way for us to move all of our stuff since we had lag time in getting into our new place. We had as much time as we needed to fill the pod, then they stored it for us at there location for a week before we were able to move into our new home. The driver was excellent, super friendly and professional and extremely helpful! I will use them again for sure!</p>
                                <p className='reviewer'> - Tara F.</p>
                            </div>

                    </div>
                </Col>
            </Row>


                {/* <div className='review-small'>
                    <h4 className='reviewTitle-small'>Smooth & Easy</h4>
                    <p className='reviewContent-small'>We are moving 45 minutes away. It was so convenient to have a pod at our home to load at our own convenience--and then have them deliver it!</p>
                    <p className='reviewer-small'> - Christina P</p>
                </div> */}


        </Grid>

        </div>

    )
}

export default Reviews;