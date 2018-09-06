import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import { Button } from 'semantic-ui-react'
import axios from 'axios'



class ProjectView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            update: false,
            count: '',
            show: false,
            confirm: false
        };
    }

    componentDidUpdate=(props)=>{
        if(this.props.import){
             this.postCourses()
        }
     }

    componentDidMount=(props)=>{

        
    }

    readFile=(data)=>{
        
        var errMessage = '';
        var array = data[0]

        this.setState({data:{}})

        if(array.length === 3){

            if(array[0] === 'source' && array[1] === 'sis_id' && array[2] === 'course_name'){

                this.props.update(data)
                this.setState({data:data})

            }else{

                errMessage = `Invalid CSV Headers.  Expecting "source, sis_id, course_name" but got ${array[0]}, ${array[1]} and ${array[2]}, .`
                this.props.error(errMessage)
            }

        }else{

            errMessage = `Invalid CSV Headers.  Expecting only "source, sis_id and course_name"<span> but got ${array[0].toString()}.`
            this.props.error(errMessage)

        }

    }


    postCourses = data => {

        var counter     = 0;
        var arrayLength = this.state.data.length-1
        var project     = this.props.projectId

        this.state.data.slice(1).forEach(course=>{
                axios.post('/api/courses', {
                    migration: this.props.projectId,
                    source: course[0],
                    sis_id: course[1],
                    course_name: course[2],
                    course_number: '',
                    status: 'Not Imported',
                })
                .then(function (response) {

                    counter++
                    console.log(counter, arrayLength)
                    if(counter === arrayLength){
                        window.location = "/courses/"+project;
                    }

                })
                .catch(function (error) { console.log(error) })

        })

    };


    render(props) {


      return ( 

        <div>  

            <Button color='yellow'>
                <Button.Content visible>              
                    <CSVReader
                        cssClass="react-csv-input"
                        onFileLoaded={this.readFile}
                    />
                </Button.Content>
            </Button>

        </div>
            
        )
    }
  }

  
  export default ProjectView;