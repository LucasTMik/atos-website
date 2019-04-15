import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// import video from '../static/media/TudoSobControleBackClip.mp4';

// import bg_01 from '../static/img/jovens/bg_01.jpg';
// import bg_02 from '../static/img/jovens/bg_02.jpg';
// import bg_03 from '../static/img/jovens/bg_03.jpg';
// import bg_04 from '../static/img/jovens/bg_04.jpeg';
import bg_05 from '../static/img/jovens/bg_05.jpg';

import logo from '../static/img/jovens/logo_tsc_white.png'
import logoAtos_white from '../static/img/logoAtos_white.png';
import logoJovens_white from '../static/img/jovens/logoJovens_white.png'
import '../fonts.css';


export default class Youth extends Component {

    constructor() {
        super();

        this.state = {
            logoClass: 'logo',
            containerClass: 'logoContainer',
            next: false
        }
        this.btnClicked = this.btnClicked.bind(this);
    }

    btnClicked() {
        this.setState({
            logoClass: 'logo logoAnim',
            containerClass: 'logoContainer logoContainerAnim',
            btnClasss: 'btn btnNext'
        }, () => setTimeout(() => this.props.history.push('/jovens/acamp'), 900));
    }

    render() {
        if (this.state.next === true)
            return <Redirect to={"/jovens/acamp"} />
        return (
            <div className={"container"}>
                <div className={"dateContainer"}>
                    <div className="logosContainer">
                        <img alt={"logo jovens"} src={logoJovens_white} />
                        <img alt={"logo atos"} src={logoAtos_white} />
                    </div>
                    <h3>19 a 23 DE JUNHO</h3>
                </div>
                <div className={this.state.containerClass}>
                    <img className={this.state.logoClass} src={logo} alt={"logo"} />
                    <button className={this.state.btnClasss} onClick={this.btnClicked}>INSCREVER-SE</button>
                </div>

                <img className={"bg_img"} src={bg_05} alt={"bg image5"} />
                <style jsx>{`

                    .logosContainer {
                        display:flex;
                        justify-content: flex-end;
                        align-items: center;
                    }

                    .logosContainer img {
                        height: 3vw;
                        padding: 3%;
                    }

                    @media screen and (max-width: 1024px) {
						.logosContainer img {
							height: 9vw;
						}
					}

                    .dateContainer {
                        position: absolute;
                        color: white;
                        z-index: 9000;
                        letter-spacing: 2px;
                        bottom: 1%;
                        right: 1%;
                        font-size: .7rem;
                    }

                    .container {
                        position: relative;
                        overflow: hidden;
                        font-family: "Gotham Light";
                    }

                    .bg_img {
                        object-fit: cover;
                        width: 100%;
                        height: 100vh;
                        max-height: 100vh;
                        filter: brightness(80%);
                    }
              
                    .logoContainer {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;    
                        width: 100%;
                        height: 100%;
                        position: absolute;
                    }

                    .logo {
                        height: 60%;
                        z-index: 9000;
                    }
                    
                    .logoAnim {
                        animation: .7s logoPage cubic-bezier(1,-0.03,1,.7) forwards;
                    }
                    .logoContainerAnim {
                        animation: .7s logoContainerAnim forwards;
                    }
                    .btnNext {
                        animation: .7s btnNext forwards;
                    }

                    // @keyframes logoPage {
                    //     0% {height: 60%;}
                    //     100% {height: 20%;}
                    // }
                    // @keyframes btnNext {
                    //     0% {opacity: 1}
                    //     100% {opacity: 0}
                    // }
                    // @keyframes logoContainerAnim {
                    //     0%{justify-content: center}
                        
                    //     100% { justify-content: start; margin-top: 30px}
                    // }

                    @media screen and (max-width: 414px) {
                        .logo {
                            height: 40%;
                        }
                    }

                    @media screen and (max-width: 414px) and (max-height: 812px) {
                        .logo {
                            height: 30%;
                        }
                    }

                `}</style>
                <style jsx global>{`
                    html, body {
                        padding: 0;
                        margin: 0;
                        overflow: hidden;
                    }

                    .btn, button {
                        text-decoration: none;
                        color: white;
                        border: 2px white solid;
                        font-size: 1rem;
                        font-family: 'Gotham light';
                        letter-spacing: 2px;
                        padding: 20px 30px;
                        margin: 20px;
                        transition: all .2s;
                        background: none;
                        z-index: 9000;
                    }

                    .btn:hover, button:hover {
                        color: rgb(60,60,65);
                        background: white;
                    }

                `}</style>
            </div>
        );
    }
}
