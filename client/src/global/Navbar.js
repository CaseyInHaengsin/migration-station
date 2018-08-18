import React, {Component} from 'react'
import './styles.css'
import Appbar from 'muicss/lib/react/appbar';

class Navbar extends Component {


    render() {
  
        let s1 = {verticalAlign: 'middle'};
        let s2 = {textAlign: 'right', paddingRight: '30px', color: "white"};

      return (
          <div>
            <Appbar>
                <table width="100%">
                    <tbody>
                        <tr>
                            <td className="mui--appbar-height nav-item"><a href='#blog-section' style={{textDecoration: "none", color: "white"}}>Blog</a></td>
                            <td className="mui--appbar-height nav-item"><a href='#about-section' style={{textDecoration: "none", color: "white"}}>About Us</a></td>
                            <td className="mui--appbar-height nav-item"><a href='#contact-form' style={{textDecoration: "none", color: "white"}}>Contact</a></td>
                            <td className="mui--appbar-height nav-item"><a href='https://emove.com/login/' target='_blank' style={{textDecoration: "none", color: "white"}}>Pay Bill Online</a></td>
                            <td className="mui--appbar-height nav-item"><a href='#login' style={{textDecoration: "none", color: "white"}}>Login</a></td>
                        </tr>
                    </tbody>
                </table>
            </Appbar>
        </div>

      );
    }
  }
  

export default Navbar;