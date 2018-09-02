import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const ClearLoader = () => (
  <div style={{height: "100%"}}>
    <Segment>
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    </Segment>
  </div>
)

export default ClearLoader
  