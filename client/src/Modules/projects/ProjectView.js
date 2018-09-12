import React, { Component} from 'react'
import { Container, Button, Icon, Header, Form, Message, Divider, Progress, Grid, List, Statistic } from 'semantic-ui-react'
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
            count: 1,
            notImported: 0,
            importing: 0,
            complete: 0,
            failed: 0,
            queued: 0,
            showNotStarted: true,
            showImporting: true,
            showQueued: true,
            showFailed: true,
            showComplete: true,
            importCount: 0
        };
    }

    componentDidMount=()=>{
        var projectId = this.props.match.params.id
        this.getData(projectId)
        this.getCourseCount(projectId)
    }

    killJob=()=>{
        axios.post('/api/kill-migration/'+this.props.match.params.id,{id: this.props.match.params.id})
        .then(function(response){
            console.log(response)
        })
        .catch(function(err){
            console.log(err)
        })
    }

    courseCheck=(getData)=>{
        var projectId = this.props.match.params.id
        this.getData(projectId)
        this.setState({courseCheckDisabled: true});

        axios.get('/api/check-migration/'+projectId).then(function(response){
            console.log('checking courses')
            if(response.data.finished){
                window.location = "/courses/"+projectId;
            }
        })

        this.getData()
    }

    update=(data)=>{
        
        this.setState({confirm: true, importCount: data.length})
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
    showConfirm=()=>{
        return(
            <div style={{marginTop: "40px"}}>
                <Message icon style={{width: "700px", marginLeft: "auto", marginRight: "auto"}}>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                    <Message.Header>Are you sure you want to add these {this.state.importCount-1} courses to this project?</Message.Header>
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
        }),function(){
            console.log(this.state.project)
        });

        const handleShellsChange = (e, { value }) =>  this.setState((prevState, props) => ({
            project: {
                ...prevState.project,
                courseShells: value,
            },
        }), function(){
            console.log(this.state.project)
        });

        const options = [
            { key: 'blackboard', text: 'Blackboard', value: 'blackboard_exporter' },
            { key: 'moodle', text: 'Moodle', value: 'moodle_converter' },
            { key: 'angel', text: 'Angel', value: 'angel_exporter' },
            { key: 'common cartridge', text: 'Common Cartridge', value: 'common_cartridge_importer' },
            { key: 'd2l', text: 'Desire To Learn', value: 'd2l_exporter' },
            { key: 'canvas', text: 'Canvas Course Export', value: 'canvas_cartridge_importer' },
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
                            <input placeholder={this.state.project.name} name='name' onChange={handleInputChange}/>
                            </Form.Field>
                            <Form.Field>
                            <label>Instructure Domain</label>
                            <input placeholder={this.state.project.domain} name='domain' onChange={handleInputChange}/>
                            </Form.Field>
                            <Form.Field>
                            <label>Path To Hard Drive From Desktop</label>
                            <input placeholder={this.state.project.path} name='path' onChange={handleInputChange}/>
                            </Form.Field>
                            <Form.Select fluid label='Import Type' options={options} placeholder={this.state.project.importType.toUpperCase().split('_').join(' ')} name='importType'  onChange={handleDropChange}/>
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

                        <Progress indicating style ={{width: "50%", marginLeft: "auto", marginRight: "auto"}} color='yellow' percent={(((this.state.complete + this.state.failed)/this.state.count).toFixed(2))*100} progress />
                        
                        <List horizontal divided style={{paddingBottom: "80px", paddingTop: "60px"}}>
                        <List.Item>
                            <List.Icon name='cloud upload' size='small' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>Not Imported</List.Header>
                                <List.Description>{this.state.notImported}</List.Description>
                            </List.Content>
                        </List.Item>
                            
                        <List.Item>
                            <List.Icon name='spinner' size='small' verticalAlign='middle' loading style={{color: "blue"}}/>
                            <List.Content>
                                <List.Header>Importing</List.Header>
                                <List.Description>{this.state.importing}</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='pause' size='small' verticalAlign='middle' style={{color: "#FF9245"}}/>
                            <List.Content>
                                <List.Header>Queued</List.Header>
                                <List.Description>{this.state.queued}</List.Description>
                            </List.Content>
                        </List.Item>

                         <List.Item>
                            <List.Icon name='close' size='small' verticalAlign='middle' style={{color: "red"}}/>
                            <List.Content>
                                <List.Header>Failed</List.Header>
                                <List.Description>{this.state.failed}</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='check' size='small' verticalAlign='middle' style={{color: "green"}}/>
                            <List.Content>
                                <List.Header>Complete</List.Header>
                                <List.Description>{this.state.complete}</List.Description>
                            </List.Content>
                        </List.Item>

                        </List>
                        
                        <Divider horizontal>Project Details</Divider>
                        <Header.Subheader><a href={url} target='_blank'>{this.state.project.name}'s Account Settings Page</a></Header.Subheader>
                        <Header.Subheader>{this.state.count} courses added to Project.</Header.Subheader>
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

            </div>
        )
    }

    getCourseCount=(projectId)=>{
        var currentComponent = this
        axios.get('/api/course-count/'+projectId).then(function(response){

            var data = response.data
            currentComponent.setState({
                notImported: data.notImported,
                importing: data.importing,
                complete: data.complete,
                failed: data.failed,
                queued: data.queued,
                count: data.count

            }, function(){

                if(this.state.importing > 0){
                    console.log("Courses Are Currently Importing")
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
                    <Button animated onClick={this.killJob}  color='yellow'>
                        <Button.Content visible>Stop Migration</Button.Content>
                        <Button.Content hidden>
                            <Icon name='stopwatch' />
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
                    
                    <Button animated href={'/courses/' + this.props.match.params.id} color='yellow'>
                        <Button.Content visible>View Courses</Button.Content>
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