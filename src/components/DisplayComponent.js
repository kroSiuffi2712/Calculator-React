import React, { Component } from 'react'


class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="display" className="display">
                <div id="display">{this.props.input}</div>
            </div>
        )
    }
}

export default Display;