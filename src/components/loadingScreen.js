import React from 'react';

import gif from '../static/icons/load.gif';

export default () => {
    return (
        <div className={"loadingComponent"}>   
            
            {/* <h2>Loading...</h2> */}
            <img src={gif} />
            <style jsx>{`
                .loadingComponent {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100vw;
                    height: 100vh;
                    position: fixed;
                }
            `}</style>
        </div>
    );
}