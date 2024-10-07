import React from 'react';
import './footer.css'
import { assets } from '../../assets/front/assets';
const Footer = () => {
  return (
    <div id='footer' className='footer'>
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sed dolorem molestiae, laudantium quod illo dicta ipsum,
                magnam, deserunt aliquam explicabo odit. Atque,
                omnis placeat. Ratione quidem perspiciatis error quam natus.
            </p>
            <div className="footer-socail-icons">
               <img src={assets.facebook_icon} alt="" />
               <img src={assets.twitter_icon} alt="" />
               <img src={assets.linkedin_icon}alt="" />
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>delivary</li>
                
                <li>privacy policay</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>
                GET IN TOUtch
            </h2>
            <ul>
                <li>+12 83277748</li>
                <li>Email: 234@example.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="footer-copy-right">
            <p>
                &copy; 2024 All rights reserved. Designed by <span>MT</span>
            </p>
        </div>
    </div>
  )
}

export default Footer
