import React, { Component} from 'react'
import { Form, Container, Button, Icon } from 'semantic-ui-react'
import axios from 'axios'
import './styles.css'
import Navbar from '../global/navbar/View'
import { Redirect } from 'react-router'



class NewProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            name: '',
            date: '',
            domain: '',
            path: '',
            importType: '',
            courseShells: false,
            complete: false
        };
    }


    componentDidMount=()=>{
        var currentComponent = this
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        dd <10 ? dd = '0'+dd : null
        mm<10 ? mm = '0'+mm : null

        today = mm + '/' + dd + '/' + yyyy;

        currentComponent.setState({date: today})
    }

    handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
        });
    }

    handleDropChange = (e, { value }) => this.setState({ importType: value })
    handleShellsChange = (e, { value }) => this.setState({ courseShells: value })


    postProjectData=(e)=>{

        var current = this;
        e.preventDefault();

        axios.post('api/projects', {
            name: this.state.name,
            date: this.state.date,
            domain: this.state.domain,
            path: this.state.path,
            courseShells: this.state.courseShells,
            importType: this.state.importType,
            complete: false
        })
        .then(function (response) {
            window.location = "/projects/"+response.data._id;
        })
        .catch(function (error) { console.log(error) })
    }


    render() {

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

          const { fireRedirect } = this.state.fireRedirect

      return ( 

        <div>

            <Navbar/>

            <div className='new-projects-container'>

                <Container>

                    <h1 style={{textAlign: "center"}}>New Migration Project</h1>
                    <Form style={{marginTop: "75px"}}>
                        <Form.Field required>
                        <label>Project Name</label>
                        <input placeholder='University of Utah' name='name' onChange={this.handleInputChange}/>
                        </Form.Field>
                        <Form.Field required>
                        <label>Instructure Domain</label>
                        <input placeholder='utah' name='domain' onChange={this.handleInputChange}/>
                        </Form.Field>
                        <Form.Field required>
                        <label>Path To Hard Drive From Desktop</label>
                        <input placeholder='/hard-drive' name='path' onChange={this.handleInputChange}/>
                        </Form.Field>
                        <Form.Select required fluid label='Import Type' options={options} placeholder='Import Type' name='importType'  onChange={this.handleDropChange}/>
                        <Form.Select required fluid label='Create Course Shells' options={shellOptions} placeholder='Create Course Shells' name='courseShells'  onChange={this.handleShellsChange}/>

                        <Button animated style={{marginTop: "30px"}} onClick={this.postProjectData}>
                            <Button.Content visible>Create</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>

                    </Form>

                </Container>

            </div>

            {fireRedirect ? <Redirect to='/'/> : null}

        </div>
               
        )
    }
  }
  
  export default NewProject;