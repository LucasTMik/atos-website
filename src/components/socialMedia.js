import React, { Component } from 'react';
import '../fonts.css';

export default class SocialMedia extends Component {
    render() {
        return (
            <div className={"socialMedia"}>
                <i className={"flaticon-soundcloud-logo"} />
                <i className={"flaticon-facebook-logo-button"} />
                <i className={"flaticon-instagram"} />
                <i className={"flaticon-brand"} />
                <style jsx>{`
                    .socialMedia {
                        position: absolute;
                        bottom: 5%;
                    }
                `}</style>
            </div>
        );
    }
}