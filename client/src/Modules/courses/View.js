import React, { Component} from 'react'
import { Table, Segment, Dimmer, Loader, Header, Icon, Button, Checkbox } from 'semantic-ui-react'
import axios from 'axios'
import CourseView from './CourseView'
import Navbar from '../global/navbar/View'



class CoursesView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            updating: true,
            domain: "",
            data:{},
            notImported: true,
            importing: true,
            queued: true,
            complete: true,
            failed: true,
            courseCheckDisabled: false
        };
    }

    componentDidMount=()=>{

        var currentComponent = this
        var projectId = this.props.match.params.id

        axios.get('/api/project-courses/'+projectId).then(function(response){
            var courses = response.data
            currentComponent.setState({data: courses, updating: false})
        })

        axios.get('/api/projects/'+projectId).then(function(response){
            var domain = response.data.domain
            currentComponent.setState({domain: domain})
        })

    }

    courseCheck=(getData)=>{

        var projectId = this.props.match.params.id
        this.setState({courseCheckDisabled: true, updating: true});

        axios.get('/api/check-migration/'+projectId).then(function(response){
            if(response.data.finished){
                window.location.reload()
            }
        })

    }

    handleInputChangeNotImported = (event) => {
        this.setState(prevState => ({
        notImported: !prevState.notImported
        }), function(){
            console.log(this.state.notImported)
        });
    }

    handleInputChangeComplete = (event) => {
        this.setState(prevState => ({
        complete: !prevState.complete
        }), function(){
            console.log(this.state.complete)
        });
    }

    handleInputChangeQueued = (event) => {
        this.setState(prevState => ({
        queued: !prevState.queued
        }), function(){
            console.log(this.state.queued)
        });
    }

    handleInputChangeImporting = (event) => {
        this.setState(prevState => ({
        importing: !prevState.importing
        }), function(){
            console.log(this.state.importing)
        });
    }

    handleInputChangeFailed = (event) => {
        this.setState(prevState => ({
        failed: !prevState.failed
        }), function(){
            console.log(this.state.failed)
        });
    }


    returnCourses=()=>{
        return(
            <div>

                <div style={{textAlign: "right", marginRight: "30px"}}>
                    <Checkbox toggle defaultChecked label='Not Imported' style={{paddingRight: "10px"}} name='notImported' onClick={this.handleInputChangeNotImported}/>
                    <Checkbox toggle defaultChecked label='Importing' style={{paddingRight: "10px"}} name='importing' onClick={this.handleInputChangeImporting}/>
                    <Checkbox toggle defaultChecked label='Queued' style={{paddingRight: "10px"}} name='queued' onClick={this.handleInputChangeQueued}/>
                    <Checkbox toggle defaultChecked label='Failed' style={{paddingRight: "10px"}} name='failed' onClick={this.handleInputChangeFailed}/>
                    <Checkbox toggle defaultChecked label='Complete' style={{paddingRight: "10px"}} name='complete' onClick={this.handleInputChangeComplete}/>
                </div>

                <Table celled>
                            
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'></Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Source</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>sis_id</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Course Name</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Status</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Error Message</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                
                    <Table.Body>

                    {this.state.importing ?
                            this.state.data.map(course=>{
                                if(course.status === 'Importing'){
                                    return(
                                        <CourseView errMessage={course.errMessage} domain={this.state.domain} key={course._id} source={course.source} sisId={course.sis_id} courseName={course.course_name} status={course.status}/>
                                    )
                                }
                            })
                            : null
                    }

                    {this.state.notImported ?
                            this.state.data.map(course=>{
                                if(course.status === 'Not Imported'){
                                    return(
                                        <CourseView errMessage={course.errMessage} domain={this.state.domain} key={course._id} source={course.source} sisId={course.sis_id} courseName={course.course_name} status={course.status}/>
                                    )
                                }
                            })
                            : null
                    }

                    {this.state.queued ?
                            this.state.data.map(course=>{
                                if(course.status === 'Queued'){
                                    return(
                                        <CourseView errMessage={course.errMessage} domain={this.state.domain} key={course._id} source={course.source} sisId={course.sis_id} courseName={course.course_name} status={course.status}/>
                                    )
                                }
                            })
                            : null
                    }

                    {this.state.complete ?
                            this.state.data.map(course=>{
                                if(course.status === 'Complete'){
                                    return(
                                        <CourseView errMessage={course.errMessage} domain={this.state.domain} key={course._id} source={course.source} sisId={course.sis_id} courseName={course.course_name} status={course.status}/>
                                    )
                                }
                            })
                            : null
                    }

                    {this.state.failed ?
                            this.state.data.map(course=>{
                                if(course.status === 'Failed'){
                                    return(
                                        <CourseView errMessage={course.errMessage} domain={this.state.domain} key={course._id} source={course.source} sisId={course.sis_id} courseName={course.course_name} status={course.status}/>
                                    )
                                }
                            })
                            : null
                    }

                    </Table.Body>
                </Table>
            </div>
        )
    }

    clearErrors=()=>{

        var projectId = this.props.match.params.id
        this.setState({errorClearDisabled: true, updating: true});

        axios.post('/api/clear-errors/'+projectId).then(function(response){
            if(response.data.finished){
                window.location.reload()
            }
        })

    }


    
    returnLoader=()=>{
        return(
            <Segment style={{height: '100vh', marginTop: "-.5vh"}}>
                <Dimmer active>
                <Loader size='massive'>Updating Course Information</Loader>
                </Dimmer>
          </Segment>
        )
    }



    render() {


      return ( 

            <div>

                <Navbar/>

                <div style={{padding: "40px"}}>

                <div>
                    <Button.Group>
                        <Button animated href={'/projects/'+this.props.match.params.id} color='yellow'>
                            <Button.Content visible>Back to Project</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow left'/>
                            </Button.Content>
                        </Button>
                        <Button.Or />
                        <Button animated onClick={this.courseCheck} disabled={this.state.courseCheckDisabled} color='yellow'>
                            <Button.Content visible>Check Course Status'</Button.Content>
                            <Button.Content hidden>
                                <Icon name='question' />
                            </Button.Content>
                        </Button>
                        <Button.Or />
                        <Button animated onClick={this.clearErrors} disabled={this.state.errorClearDisabled} color='yellow'>
                            <Button.Content visible>Clear Failed Errors</Button.Content>
                            <Button.Content hidden>
                                <Icon name='question' />
                            </Button.Content>
                        </Button>
                    </Button.Group>
                </div>

                    <Header as='h2' style={{marginTop: "130px"}}>
                        <Icon name='settings' />
                        <Header.Content>
                            Course Details
                        <Header.Subheader>List of Courses Associated with this project</Header.Subheader>
                        </Header.Content>
                    </Header>
                    
                    {this.state.updating ? this.returnLoader() : this.returnCourses()}
                
                </div>


            </div>

        )
    }
  }
  
  export default CoursesView;