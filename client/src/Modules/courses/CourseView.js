import React from 'react'
import { Table, Button } from 'semantic-ui-react'



const courseView=(props)=>{


        var courseURL = `https://${props.domain}.instructure.com/courses/sis_course_id:${props.sisId}/content_migrations`

        return(

            <Table.Row>
                    <Table.Cell textAlign='center' style={{width: "10%"}}><Button><a href={courseURL} target="_blank">Visit Course</a></Button></Table.Cell>
                    <Table.Cell textAlign='center'>{props.source}</Table.Cell>
                    <Table.Cell textAlign='center'>{props.sisId}</Table.Cell>
                    <Table.Cell textAlign='center'>{props.courseName}</Table.Cell>
                    <Table.Cell textAlign='center' style={{width: "8%"}}>{props.status}</Table.Cell>

                    <Table.Cell textAlign='center' style={{width: "35%"}}>{props.errMessage}</Table.Cell>

                </Table.Row>
        )
      
  }
  
  export default courseView;