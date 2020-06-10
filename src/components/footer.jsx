import React from 'react';


export default class Footer extends React.Component {

    render() {
        return (
            <div style={{position:"fixed", bottom:0, width:"100%", textAlign:"center", backgroundColor:"rgba(0, 0, 0, 0.548)", padding:5}}>
                <code style={{fontSize: 11, color: "white"}}>Made by incrediblejagur || <a style={{color:'rgba(232, 87, 77)'}} href="https://github.com/incrediblejagur/suduko-webapp/issues">Report Bug</a>
                </code>
                </div>
        )
    }
}