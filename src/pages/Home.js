import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../fonts.css';
import home_01 from '../static/img/home/home_01.jpg';
import home_02 from '../static/img/home/home_02.jpg';
import series_01 from '../static/img/home/series_01.jpg';

import Navigator from '../components/navigator';
// import Footer from '../components/footer';

export default class Home extends Component {
    render() {
        return (
            <div className={"page"}>
                <div className={"nav"}>
                    <Navigator />
                </div>
                <div className={"container"}>
                    <div className={"headerContainer"}>
                        <h1>PRESBITERIANA <span className={"atosText"} >ATOS</span></h1>
                    </div>
                </div>
                <div className={"seriesContainer"}>
                    <h3>NOVA SÉRIE!</h3>
                    <h2>RE JESUS</h2>
                    <Link className={"btn"} to={"/"} >ONDE</Link>
                </div>
                <div className={"aboutContainer"}>
                    <h3><span className={"atosText"}>NOVO</span> AQUI? <span className={"atosText"}>SAIBA</span> MAIS:</h3>
                    <div className={"aboutActions"}>
                        <Link className={"btn"} to={"/"} >NOSSO PASTOR</Link>
                        <Link className={"btn"} to={"/"} >NOSSOS CONSELHO</Link>
                        <Link className={"btn"} to={"/"} >NOSSOS VALORES</Link>
                    </div>
                </div>
                <div className={"soundContainer"}>
                    <h3><span className={"atosText"}>UMA IGREJA</span> // DUAS MANEIRAS</h3>
                    <div className={"locations"}>
                        <div>
                            <button className={"btn"} >São Gonçalo</button>
                            <div>
                                <p>Domingos</p>
                                <p>10:00 horas | 18:00 horas</p>
                            </div>
                        </div>
                        <div>
                            <button className={"btn"}>SoundClound</button>
                            <div>
                                <p>Sempre</p>
                                <p>Venha nos escutar</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"eventsContainer"}>
                    <h3>VEJA O QUE ESTÁ POR <span className={"atosText"}>VIR</span>!</h3>
                    <Link className={"btn"} to={"/"} >EVENTOS</Link>
                </div>
                {/* <Footer /> */}
                <style jsx>{`
                    body {
                        margin: 0;
                        width: 100%;
                    }

                    .page {
                        font-family: 'Gotham Light';
                        letter-spacing: 2px;
                        color: white;
                    }

                    h1,h2,h3,h4,p {
                        padding: 0;
                        margin: 0;
                    }

                    .container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background: url(${home_01});
                        background-size: cover;
                    }

                    .aboutContainer {
                        height: 50vh;
                        background: rgb(60,60,65);
                        color: white;
                        letter-spacing: 1px;
                        font-size: 1.3rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    
                    .aboutActions {
                        margin: 70px 0px;
                    }

                    .headerContainer {
                        font-size: 2rem;
                    }
                    
                    .soundContainer {
                        background: url(${home_02});
                        background-size: cover;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 50vh;
                        font-size: 1.5rem;
                    }

                    .soundContainer .locations {
                        display: flex;
                    }

                    .locations div {
                        margin: 10px 50px;
                        font-size: 1rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }

                    .locations p {
                        padding: 5px;
                        font-family: 'Gotham Bold';
                    }
                    
                    .eventsContainer {
                        background: rgb(60,60,65);
                        height: 50vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        font-size: 1.3rem;
                    }

                    .eventsContainer h3{
                        padding: 0;
                        margin: 0;
                    }
                    
                    
                    .seriesContainer {
                        width: 100%;
                        height: 60vh;
                        background: url(${series_01});
                        background-size: cover;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        color: white;
                    }
                    
                    .seriesContainer h2 {
                        font-size: 4rem;
                        margin: 50px;
                    }
                    
                    
                    .atosText {
                        font-family: 'Gotham Bold';
                    }
                `}</style>
                <style jsx global>{`
                    .nav {
                        position: absolute;
                        top: 2%;
                        left: 0;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .nav .btn {
                        color: white;
                        border: none;
                    }

                    
                    .btn, button {
                        text-decoration: none;
                        color: white;
                        border: 2px white solid;
                        font-size: 1rem;
                        font-family: 'Gotham Bold';
                        padding: 20px 30px;
                        margin: 20px;
                        transition: all .2s;
                        background: none;
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