import React from 'react'
import './styles.css'
import { Button, Icon } from 'semantic-ui-react'
import Logo from '../../../images/canvas_logo.png'


const Nav = ()=>{
    return(
        <div className='navbar-container'>

            <img src={Logo} className='navbar-logo'></img>
            
            <div>
                <h1 className='navbar-title'>Canvas Migration Station</h1>
            </div>

            <div className='navbar-links'>

              <Button.Group>
                    <Button animated href='/'>
                    <Button.Content visible>Home</Button.Content>
                        <Button.Content hidden>
                            <Icon name='home' />
                        </Button.Content>
                    </Button>
                    <Button animated href='/new-project'>
                    <Button.Content visible>New Project</Button.Content>
                        <Button.Content hidden>
                            <Icon name='plus' />
                        </Button.Content>
                    </Button>
                    <Button animated>
                    <Button.Content visible>Migration Errors</Button.Content>
                        <Button.Content hidden>
                            <Icon name='bug' />
                        </Button.Content>
                    </Button>
                    <Button>All Projects</Button>
                </Button.Group>

            </div>

        </div>
    )
}

export default Nav