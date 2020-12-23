import React, { Component } from 'react';
import './containers.css';

export default class Containers extends Component {
    render(){
        return(
            // <div className = "containers Mt-50">
            //     {this.props.children}
            // </div>
            <div className = "container">
                {this.props.children}
            </div>
        )
    }
}