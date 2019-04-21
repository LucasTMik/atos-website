import React, { Component } from 'react';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            item1: "active",
            item2: ""            
        }

        this.handleBanner = this.handleBanner.bind(this);
    }

    componentDidMount() {
        this.handleBanner();
    }

    handleBanner() {
        setInterval(() => {
            if(this.state.item1.match('active')) {
                this.setState({item2: "active",item1:""});
            } else {
                this.setState({item1: "active",item2:""});
            }
        }, 4000);
    }

    render() {
        console.log(this.state)
        return (
            <div className="bannerContainer">
                <ul>
                    <li className={"item " + this.state.item1}><img src="https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/08/16/104656646-Melbourne.1910x1000.jpg" /></li>
                    <li className={"item " + this.state.item2}><img src="http://techomebuilder.com/wp-content/uploads/2016/06/smart-city-e1465926076534.jpg" /></li>

                    <button onClick={this.handleBanner}>clic</button>
                </ul>
                <style jsx>{`
                    .bannerContainer {
                        width: 100vw;
                        height: 100vh;
                        background: gray;
                        position: relative;
                    }
                    .bannerContainer ul .item {
                        display: none;
                        position: absolute;
                    }
                    .bannerContainer ul .item.active {
                        display: block;
                        animation: move 1s;
                    }

                    @keyframes move {
                        from{opacity: 0}
                        to{background: 1}
                    }
                `}</style>
            </div>
        );
    }
}