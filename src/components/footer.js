import React, { Component } from 'react';

import SocialMedia from './socialMedia';

export default class Home extends Component {
    render() {
        return (
            <div className={"footerContainer"}>
                    <div className={"mapContainer"}>
                    </div>
                    <div className={"formContainer"}>
                        
                        <SocialMedia />
                    </div>
                <style jsx>{`
                    .footerContainer {
                        height: 50vh;
                        background: rgb(60,60,65);
                        display: flex;
                        position: relative;
                    }

                    .formContainer {
                        width: 100%;
                    }

                    .mapContainer {
                        background: white;
                        width: 100%;
                        height: 100%;
                    }
                `}</style>
            </div>
        );
    }
}