import React from 'react'
import './styles.css'

const Footer =()=>{
    return(
        <footer className="flex-rw">
  
            <ul className="footer-list-top">
                <li>
                <h4 className="footer-list-header">Sister Companies</h4></li>
                <li><a href='http://boinglebox.com' className="generic-anchor footer-list-anchor" itemprop="significantLink">Boingle Box</a></li>
                <li><a href='http://gilagoat.com' className="generic-anchor footer-list-anchor" itemprop="significantLink">Gila Goat</a></li>
            </ul>
            <ul className="footer-list-top">
                <li>
                <h4 className="footer-list-header">Our Other Companies</h4></li>


                <li><a href='/Angels/cat/id/70' className="generic-anchor footer-list-anchor">ANGEL FIGURINES</a></li>
                <li><a href='/Home-Decor/cat/id/64' className="generic-anchor footer-list-anchor">HOME DECOR</a></li>
                <li><a href='/Mugs/cat/id/32' className="generic-anchor footer-list-anchor">MUGS</a></li>
                <li><a href='/Pet-Lover/cat/id/108' className="generic-anchor footer-list-anchor">PET LOVER</a></li>
                <li><a href='/Ladies-Accessories/cat/id/117' className="generic-anchor footer-list-anchor" target="_blank">HANDBAGS & JEWELRY</a></li>
            </ul>

            <section className="footer-bottom-section flex-rw">
            <div className="footer-bottom-wrapper">   
            <i className="fa fa-copyright" role="copyright">
            
            </i> Created and Designed By <span style={{color: "#EFCB6E"}}>SaltUX Designs</span> <span className="footer-bottom-rights"> - All Rights Reserved - </span>
                </div>
                <div className="footer-bottom-wrapper">
                <a href="/terms-of-use.html" className="generic-anchor" rel="nofollow">Terms</a> | <a href="/privacy-policy.html" className="generic-anchor" rel="nofollow">Privacy</a>
                </div>
            </section>
        </footer>
    )

}

export default Footer;