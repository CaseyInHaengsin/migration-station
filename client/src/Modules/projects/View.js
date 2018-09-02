import React, { Component} from 'react'
import { Container, Grid } from 'semantic-ui-react'
import axios from 'axios'
import './styles.css'
import Project from './Project'



class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            update: false
        };
    }

    componentDidMount=()=>{
        this.getData()
    }


    getData=()=>{
        let currentComponent = this
        axios.get('api/projects')
        .then(function (response) {
            currentComponent.setState({projects: response.data, update: true}, function(){
                console.log(this.state)
            })
        })
        .catch( function (error) { console.log(error) })
    }


    postProjectData=()=>{
        axios.post('api/projects', {
            name: "University of Utah",
            date: "August 6, 2018",
            courseCount: "477",
            importType: "Common Cartridge",
            complete: false
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) { console.log(error) })
    }

    postCourseData=()=>{
        axios.post('api/courses', {
            migration: '5b8455c2f6b58c30c933dae6',
            source: "users/awalz/desktop/export_file_222232235",
            sis_id: "test_4is_id",
            course_number: 508,
            status: "In Progress",
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) { console.log(error) })
    }

    update=()=>{
        return(
            this.state.projects.map(p=>{
                {console.log(p)}
                return(
                
                    <Project name={p.name} key={p._id} courseCount={p.courses.length} date={p.date} importType={p.importType} id={p._id} complete={p.complete}/>
                )
            })
        )
    }   


    render() {


      return ( 

        <div className='projects-container'>

            <h1 style={{textAlign: "center"}}>Recent Migration Projects</h1>

            <Container>
                <Grid columns={3} >
                    <Grid.Row>
                        {this.state.update ? this.update() : null }
                    </Grid.Row>
                </Grid>
            </Container>

        </div>
               
        )
    }
  }
  
  export default Projects;
