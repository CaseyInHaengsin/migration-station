import React, { Component} from 'react'
import { Table, Button } from 'semantic-ui-react'
import axios from 'axios'
import './styles.css'



class CoursesView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            update: false
        };
    }

    componentDidMount=()=>{
        var courseID = this.props.courseID
        this.getData(courseID)
    }

    getData=(courseID)=>{
        let currentComponent = this
        axios.get("/api/courses/"+courseID)
        .then(function (response) {
            currentComponent.setState({course: response.data, update: true}, function(){

            })
        })
        .catch( function (error) { 

        })
    }

    returnData=()=>{

        var courseURL = `https://${this.props.domain}.instructure.com/courses/sis_course_id:${this.state.course.sis_id}/content_migrations`
        // if(this.state.course.status !== 'Complete'){
            return(
                <Table.Row>

                    <Table.Cell textAlign='center'>{this.state.course.source}</Table.Cell>
                    <Table.Cell textAlign='center'>{this.state.course.sis_id}</Table.Cell>
                    <Table.Cell textAlign='center'>{this.state.course.course_name}</Table.Cell>
                    <Table.Cell textAlign='center'>{this.state.course.status}</Table.Cell>

                    <Table.Cell textAlign='center'>
                        <Button.Group style={{marginRight: "30px"}}>
                            <Button><a href={courseURL} target="_blank">Visit Course</a></Button>
                            <Button.Or />
                            <Button positive onClick={this.reimport} id={this.state.course._id}>Mark Complete</Button>
                            <Button.Or />
                            <Button negative onClick={this.reimport} id={this.state.course._id}>Delete</Button>
                        </Button.Group>
                    </Table.Cell>

                </Table.Row>
            )
        // }
    }



    render() {


      return ( 

            this.state.update ? this.returnData() : null

        )
    }
  }
  
  export default CoursesView;



