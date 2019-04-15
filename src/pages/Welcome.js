import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import bg_01 from '../static/img/welcome/bg_02.jpg';
import logo_01 from '../static/img/logo_01_white.png'
import '../fonts.css';

import SocialMedia from '../components/socialMedia';

export default class Welcome extends Component {
    render() {
        return (
            <div className={"container"}>
                <div className={"logoContainer"}>
                    <img src={logo_01} alt="tst"/>
                </div>
                <div className={"content"}>
                    <h3>BEM VINDO</h3>
                    <h3>IGREJA PRESBITERIANA <span className={"atosText"}>ATOS</span></h3>
                    <div className={"btnContainer"}>
                        <Link to={'/'} className={"enterSite"} >EM BREVE!</Link>
                    </div>
                </div>
                {/* <SocialMedia /> */}
                <style jsx>{`
                    body {
                        margin: 0;
                        background: black;
                        border: 2.5vh white solid;
                        height: 95vh;
                        background: url(${bg_01}) no-repeat;
                        background-size: cover;
                        overflow: hidden;
                    }
                    
                    .container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 95vh;
                    }

                    .logoContainer {
                        width: 90%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .logoContainer img {
                        width: 90px;
                        margin-top: 40px;
                    }

                    
                    .content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        margin: 0px 200px;
                        height: 100%;
                    }
                    
                    .content h3 {
                        color: white;
                        font-size: 2.2em;
                        letter-spacing: 6px;
                        font-family: 'Gotham Light';
                        text-align: center;
                        margin: 20px 0px;
                    }

                    .atosText {
                        font-family: 'Gotham Bold';
                    }

                    .btnContainer {
                        margin: 40px;
                    }

                    @media screen and (max-width: 400px) {
                        .container {
                            padding: 20px;
                        }
                        .container h3 {
                            font-size: 1.5em;
                            
                        }
                    }
                    `}</style>
                <style jsx global>{`
                    .enterSite {
                        background: white;
                        text-decoration: none;
                        padding: 15px 20px;
                        color: black;
                        font-family: 'Gotham Light';
                        font-weight: bold;
                        letter-spacing: 3px;
                        transition: all .5s; 
                    }

                    .enterSite:hover {
                        background: black;
                        color: white;
                        margin: 40px 0px;
                    }
              
                `}</style>
            </div>
        );
    }
}