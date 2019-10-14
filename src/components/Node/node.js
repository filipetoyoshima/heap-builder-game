import React from 'react'

export default class Node extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{
                background: 'blue',
                width: 80,
                height: 80,
                borderRadius: 40,
                position: 'absolute',
                top: this.props.y,
                left: this.props.x,
            }}
            >
            </div>
        )
    }
}