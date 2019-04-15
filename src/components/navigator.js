import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo_01 from '../static/img/logo_01.png';

import '../fonts.css';

export default class Navigator extends Component {
    render() {
        return (
            <div className={"navContainer"}>
                <div className={"nav"}>
                    <Link className={'btn'} to={"/"}>SOBRE</Link>
                    <Link className={'btn'} to={"/"} >AJUDE</Link>
                    <Link className={'btn'} to={"/"} >CONECTE</Link>
                    <img src={logo_01} alt={"Logo"}></img>
                    <Link className={'btn'} to={"/"} >MINISTÉRIOS</Link>
                    <Link className={'btn'} to={"/"} >ONDE</Link>
                    <Link className={'btn'} to={"/"} >MÍDIA</Link>
                </div>
                <style jsx>{`
                    .navContainer {
                        width: 100%:
                        height: 200px;
                        margin: 20px;
                    }
                    .nav {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .nav img {
                        width: 7%;
                        margin: 0px 40px;
                    }
                `}</style>
                <style jsx global>{`
                    .nav .btn {
                        text-decoration: none;
                        color: black;
                        margin: 0px 20px;
                        font-size: .7rem;
                        font-family: 'Gotham Light';
                        letter-spacing: 2px;
                    }
                `}</style>
            </div>
        );
    }
}