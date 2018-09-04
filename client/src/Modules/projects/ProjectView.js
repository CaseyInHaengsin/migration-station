import React, { Component} from 'react'
import { Table, Container, Button, Icon, Header, Form, Message, Divider, Progress, Grid, Checkbox, Statistic } from 'semantic-ui-react'
import axios from 'axios'
import './styles.css'
import Navbar from '../global/navbar/View'
import CourseView from './CoursesView'
import FileReader from '../global/fileReader/View';



class ProjectView extends Component {

    constructor(props) {
        super(props);

        this.update = this.update.bind(this)
        this.error = this.error.bind(this)

        this.state = {
            update: false,
            courses: false,
            edit: false,
            confirm: false,
            import: false,
            error: false,
            errorMessage: '',
            importDisabled: false,
            courseCheckDisabled: false,
            count: 0,
            notImported: 0,
            importing: 0,
            complete: 0,
            failed: 0,
            queued: 0,
            showNotStarted: true,
            showImporting: true,
            showQueued: true,
            showFailed: true,
            showComplete: true
        };
    }

    courseCheck=(getData)=>{
        var projectId = this.props.match.params.id
        this.getData(projectId)
        this.setState({courseCheckDisabled: true});

        axios.get('/api/check-migration/'+projectId).then(function(response){
            console.log('checking courses')
        })

        this.getData()
    }

    update=(data)=>{
        
        this.setState({confirm: true, count: data.length})
    }

    error=(errMessage)=>{
        this.setState({error: true, errorMessage: errMessage})
    }

    deny=()=>{
        window.location.reload()
    }

    confirm=()=>{
        this.setState({import: true, confirm: false})
    }

    editProject=()=>{
            this.setState({edit: true})
    }

    updateMigrationsDB=()=>{

        var currentComponent = this;

        axios({
            method: 'put',
            url: '/api/projects/'+this.state.project._id,
            data: {
                name: this.state.project.name,
                domain: this.state.project.domain,
                path: this.state.project.path,
                importType: this.state.project.importType,
                courseShells: this.state.project.courseShells,
                data: this.state.project.date
            }
          }).then(function(response){
                currentComponent.setState({edit: false})
          }).catch(function(err){
              console.log(err)
          })

    }

    showConfirm=()=>{
        return(
            <div style={{marginTop: "40px"}}>
                <Message icon style={{width: "700px", marginLeft: "auto", marginRight: "auto"}}>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                    <Message.Header>Are you sure you want to add these {this.state.count-1} courses to this project?</Message.Header>
                    <br/>
                    <br/>
                    <Button.Group>
                        <Button onClick={this.deny}>Cancel</Button>
                        <Button.Or />
                        <Button positive onClick={this.confirm}>Import</Button>
                    </Button.Group>
                    </Message.Content>
                </Message>
            </div>
        )
    }

    showError=(errMessage)=>{
        return(
            <div style={{marginTop: "40px"}}>
                <Message icon style={{width: "700px", marginLeft: "auto", marginRight: "auto"}}>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                    <Message.Header>Error Adding Courses</Message.Header>
                    {this.state.errorMessage}
                    <br/>
                    <br/>
                        <Button onClick={this.deny}>Close</Button>
                    </Message.Content>
                </Message>
            </div>
        )
    }


    startMigration=(e)=>{
        var projectId = this.props.match.params.id
        var current = this;
        e.preventDefault();

        this.setState({importDisabled: true});

        axios.post('/api/start-migration/'+projectId, {
            id: this.state.projectId,
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) { console.log(error) })

    }

    editProjectDetails=()=>{


        const handleInputChange = (event) => {

            const value = event.target.value;
            const name = event.target.name;

            this.setState((prevState, props) => ({
                project: {
                    ...prevState.project,
                    [name]: value,
                },
            }));

            
        }
    
        const handleDropChange = (e, { value }) =>  this.setState((prevState, props) => ({
            project: {
                ...prevState.project,
                importType: value,
            },
        }));

        const handleShellsChange = (e, { value }) =>  this.setState((prevState, props) => ({
            project: {
                ...prevState.project,
                importType: value,
            },
        }));

        const options = [
            { key: 'blackboard', text: 'Blackboard', value: 'blackboard' },
            { key: 'moodle', text: 'Moodle', value: 'moodle' },
            { key: 'angel', text: 'Angel', value: 'angel' },
            { key: 'common cartridge', text: 'Common Cartridge', value: 'common cartridge' },
            { key: 'd2l', text: 'Desire To Learn', value: 'd2l' },
            { key: 'canvas', text: 'Canvas Course Export', value: 'canvas' },
          ]

          const shellOptions = [
            { key: 'shell-true', text: 'Yes', value: true },
            { key: 'shell-false', text: 'No', value: false },
          ]

        return(
            <div>
                    <Container>

                        <h1 style={{textAlign: "center"}}>Edit {this.state.project.name}</h1>
                        <Form style={{marginTop: "75px"}}>
                            <Form.Field>
                            <label>Project Name</label>
                            <input placeholder='University of Utah' name='name' onChange={handleInputChange}/>
                            </Form.Field>
                            <Form.Field>
                            <label>Instructure Domain</label>
                            <input placeholder='utah' name='domain' onChange={handleInputChange}/>
                            </Form.Field>
                            <Form.Field>
                            <label>Path To Hard Drive From Desktop</label>
                            <input placeholder='/course-imports-directory' name='path' onChange={handleInputChange}/>
                            </Form.Field>
                            <Form.Select fluid label='Import Type' options={options} placeholder='Import Type' name='importType'  onChange={handleDropChange}/>
                            <Form.Select fluid label='Create Course Shells' options={shellOptions} placeholder='Create Course Shells' name='courseShells'  onChange={handleShellsChange}/>

                            <Button animated style={{marginTop: "30px"}} onClick={this.updateMigrationsDB}>
                                <Button.Content visible>Update</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>

                        </Form>

                    </Container>

            </div>
        )
    }

    returnProjectDetails=()=>{

        var url = `https://${this.state.project.domain}.instructure.com/accounts/self`

        return(
            <div>


                    <Header as='h1' icon style={{marginBottom: "40px"}}>
                        <Icon name='address book outline' />
                        {this.state.project.name}
                        <Progress indicating style ={{width: "50%", marginLeft: "auto", marginRight: "auto"}} color='yellow' percent={((this.state.complete + this.state.failed)/this.state.count.toFixed(0))*100} progress />
                        <Divider horizontal>Project Details</Divider>
                        <Header.Subheader><a href={url} target='_blank'>{this.state.project.name}'s Account Settings Page</a></Header.Subheader>
                        <Header.Subheader>{this.state.project.courses.length} courses added to Project.</Header.Subheader>
                    </Header>

                      <Grid columns={3} divided style={{marginBottom: "60px"}}>
                            <Grid.Row>

                                <Grid.Column>
                                    <Statistic color='yellow'>
                                        <Statistic.Value>
                                            <Icon name='calendar' style={{paddingRight: "15px"}}/>
                                            {this.state.project.date}
                                        </Statistic.Value>
                                        <Statistic.Label>Date Created</Statistic.Label>
                                    </Statistic>
                                </Grid.Column>

                                <Grid.Column>
                                     <Statistic color='yellow'>
                                        <Statistic.Value>
                                            <Icon name='upload' style={{paddingRight: "15px"}}/>
                                            Importer
                                        </Statistic.Value>
                                        <Statistic.Label>{this.state.project.importType.toUpperCase().split('_').join(' ')}</Statistic.Label>
                                    </Statistic>
                                </Grid.Column>

                                <Grid.Column>
                                    <Statistic color='yellow'>
                                        <Statistic.Value>
                                            <Icon name='road' style={{paddingRight: "15px"}}/>
                                            Path
                                        </Statistic.Value>
                                        <Statistic.Label>{this.state.project.path.toUpperCase()}</Statistic.Label>
                                    </Statistic>
                                </Grid.Column>

                            </Grid.Row>
                      </Grid>



                  <Header as='h2'>
                    <Icon name='settings' />
                    <Header.Content>
                        Course Details
                    <Header.Subheader>List of Courses Associated with this project</Header.Subheader>
                    </Header.Content>
                </Header>

            </div>
        )
    }


    componentDidMount=()=>{
        var projectId = this.props.match.params.id
        this.getData(projectId)
        this.getCourseCount(projectId)
    }

    getCourseCount=(projectId)=>{
        var currentComponent = this
        axios.get('/api/course-count/'+projectId).then(function(response){
            var data = response.data
            console.log(data)

            currentComponent.setState({
                notImported: data.notImported,
                importing: data.importing,
                complete: data.complete,
                failed: data.failed,
                queued: data.queued

            }, function(){

                var counter = this.state.notImported + this.state.importing + this.state.failed + this.state.queued + this.state.complete;
                
                
                
                currentComponent.setState({count: counter }, function(){
                    console.log(this.state.complete + this.state.failed, this.state.count)
                    console.log()
                })

                if(this.state.importing > 0){
                    currentComponent.setState({importDisabled: true})
                }

            })


        })
    }

    getData=(projectId)=>{
        let currentComponent = this
        axios.get("/api/projects/"+projectId)
        .then(function (response) {
            currentComponent.setState({project: response.data, update: true}, function(){
                
            })
        })
        .catch( function (error) { console.log(error) })
    }

    deleteProject=(event)=>{
        event.preventDefault(); 
        axios.delete('/api/projects/'+this.state.project._id, {params: {id: this.state.project._id}})
        .then(function (response) {
            window.location = "/"
        })
        .catch(function (error) { console.log(error) })
    }

    handleFiles = files => {
        console.log(files.fileList)
      }

    returnData = ()=>{

        return(
            <div className='individual-project-view'>

            <div className='individual-project-buttons'>

                <Button.Group>
                    <Button animated onClick={this.editProject} color='yellow'>
                        <Button.Content visible>Edit Project</Button.Content>
                        <Button.Content hidden>
                            <Icon name='pencil'/>
                        </Button.Content>
                    </Button>
                    <Button.Or />
                    <Button animated color='yellow'>
                        <Button.Content visible>Mark Complete</Button.Content>
                        <Button.Content hidden>
                            <Icon name='check'/>
                        </Button.Content>
                    </Button>
                    <Button.Or />
                    <Button animated onClick={this.deleteProject} color='yellow'>
                        <Button.Content visible>Delete Project</Button.Content>
                        <Button.Content hidden>
                            <Icon name='delete' />
                        </Button.Content>
                    </Button>
                    <Button.Or />
                    <Button animated onClick={this.startMigration} disabled={this.state.importDisabled} color='yellow'>
                        <Button.Content visible>Start Migration</Button.Content>
                        <Button.Content hidden>
                            <Icon name='hourglass start' />
                        </Button.Content>
                    </Button>
                    <Button.Or />
                    <Button animated onClick={this.courseCheck} disabled={this.state.courseCheckDisabled} color='yellow'>
                        <Button.Content visible>Check Courses</Button.Content>
                        <Button.Content hidden>
                            <Icon name='question' />
                        </Button.Content>
                    </Button>
                    <Button.Or />
                    
                    <FileReader projectId={this.state.project._id} update={this.update} error={this.error} import={this.state.import} />


                </Button.Group>

            </div>

            {this.state.confirm ? this.showConfirm() : null}
            {this.state.error ? this.showError() : null}


            <div style={{padding: "25px"}}>
                   
                <div className='individual-project-courses'>

                {this.state.edit ? this.editProjectDetails() : this.returnProjectDetails() }

                <div style={{textAlign: "right", marginRight: "30px"}}>
                    <Checkbox toggle defaultChecked label='Not Started' style={{paddingRight: "10px"}}  name='showNotStarted'/>
                    <Checkbox toggle defaultChecked label='Importing' style={{paddingRight: "10px"}} name='showImporting'/>
                    <Checkbox toggle defaultChecked label='Queued' style={{paddingRight: "10px"}} name='showQueued'/>
                    <Checkbox toggle defaultChecked label='Failed' style={{paddingRight: "10px"}} name='showFailed'/>
                    <Checkbox toggle defaultChecked label='Complete' style={{paddingRight: "10px"}} name='showComplete'/>
                </div>

                  <Table selectable>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>Source</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>SIS ID</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Course Name</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Status</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {this.state.project.courses.map((course, key)=>{
                            return(
                                <CourseView 
                                    courseID={course} 
                                    key={key} 
                                    domain={this.state.project.domain} 
                                    notStarted={this.state.showNotStarted} 
                                    importing={this.state.showImporting} 
                                    queued={this.state.showQueued}
                                    complete={this.state.showComplete}
                                    failed={this.state.showFailed}
                                />
                            )
                        })}

                
                    
                    </Table.Body>

                </Table>


                </div>

            </div>
           
           </div>
        )
    }


    render() {


      return ( 

        <div>

            <Navbar/>

            {this.state.update ? this.returnData() : null}

        </div>
               
        )
    }
  }
  
  export default ProjectView;