import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { PresignedPost } from 'aws-sdk/clients/s3';

const ClearLoader = (props) => (
  <div>
    <Segment style={{height: "100vh"}} size='massive'>
      <Dimmer active>
        <Loader>{props.message}</Loader>
      </Dimmer>
    </Segment>
  </div>
)

export default ClearLoader
  