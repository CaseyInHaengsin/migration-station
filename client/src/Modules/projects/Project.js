import React from 'react'
import { Card, Icon, Image, Grid, Button } from 'semantic-ui-react'
import migratingImage from '../../images/migrating.gif'
import completeImage from '../../images/complete.png'
import './styles.css'

const Project = (props) => (

    <Grid.Column style={{marginTop: "15px"}}>

        <Card className="project-card">

            <Image src={props.complete ? completeImage : migratingImage} className='project-image'/>
        
            <Card.Content className='project-content'>
                <Card.Header style={{color: "white"}}>{props.name}</Card.Header>
                <Card.Meta>
                    <span className='date'>{props.date}</span>
                </Card.Meta>
                <Card.Description>{props.courseCount} Courses Added</Card.Description>
            </Card.Content>

            <Card.Content extra>
                <Icon name='user' />{props.importType.toUpperCase().split('_').join(' ')}<br/><br/>

                <a href={'/projects/' + props.id}> <Button animated>
                    <Button.Content visible>Import Details</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button></a>

            </Card.Content>

        </Card>

  </Grid.Column>

)

export default Project