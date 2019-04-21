import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../fonts.css';
import Banner from '../components/banner';



export default class Home extends Component {

    render() {
        return (
            <div className="homeContainer">
                <div className="bannerContainer">
                    <div className="bg"></div>
                    <div className="centerDiv textContainer">
                        <h1>IGREJA PRESBITERIANA <span>ATOS</span></h1>
                    </div>
                </div>
                <div className="contentContainer one">
                    <h3> Hello </h3>
                    <div className="content">
                        <button className="btn">Hello</button>
                    </div>
                </div>
                <style jsx>{`
                    .centerDiv{position: absolute;top:50%;left: 50%; transform: translate(-50%,-50%)}

                    .homeContainer .homeContainer {font-family: 'Gotham Light';}
                    .homeContainer .bannerContainer{width: 100vw; height: 100vh; background: gray;position: relative;}
                    .homeContainer .bannerContainer .bg {background: url(https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/08/16/104656646-Melbourne.1910x1000.jpg) center;background-size: cover; width: 100vw;height:100vh;filter: contrast(50%) blur(20px);}
                    .homeContainer .textContainer {}
                    .homeContainer .bannerContainer h1 {color: white;letter-spacing:2px;font-size: 35px; font-weight: bold; }
                    .homeContainer .bannerContainer h1 span {font-family: 'Gotham Bold';}

                    .contentContainer {
                        position: relative;
                        height: 50vh;
                        width: 100%;
                    }
                    .contentContainer.one {background: url(http://www.intheblack.com/~/media/intheblack/allimages/magazine-2017/02-february/feature-cities-feature.jpg);background-size: cover;}
                    .homeContainer .contentContainer h3{font-size: 25px; padding: 20px;color: white;letter-spacing: 2px;font-weight: bold;}
                    .homeContainer .contentContainer .content {position: absolute; top:60%;left:50%;transform:translate(-50%,-60%)}
                    
                    .btn {
                        background: transparent;
                        text-decoration: none;
                        padding: 15px 20px;
                        color: white;
                        font-family: 'Gotham Light';
                        font-weight: bold;
                        letter-spacing: 3px;
                        transition: all .2s; 
						width: 300px;
						border: 2px solid white;
						-webkit-border-radius: 5px;
						-moz-border-radius: 5px;
						border-radius: 5px;
						margin: 20px 0px;
                    }
                `}</style>
            </div>
        );
    }
}