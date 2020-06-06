import React, { Component } from 'react'


class Clear extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button id="clear" className="clear" onClick={()=>this.props.handleClear()}>AC</button>
        )
    }
}

export default Clear;