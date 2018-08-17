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
                            <td className="mui--appbar-height nav-item">Services</td>
                            <td className="mui--appbar-height nav-item">Blog</td>
                            <td className="mui--appbar-height nav-item">About Us</td>
                            <td className="mui--appbar-height nav-item">Contact</td>
                            <td className="mui--appbar-height nav-item">Pay Bill Online</td>
                            <td className="mui--appbar-height nav-item" style={s2}>Login</td>
                        </tr>
                    </tbody>
                </table>
            </Appbar>
        </div>

      );
    }
  }
  

export default Navbar;