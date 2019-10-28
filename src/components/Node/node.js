import React from 'react'

export default class Node extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = parseInt(e.target.value);
        this.props.updateValues(this.props.i, value);
    }

    render() {
        return (
            <button style={{
                background: this.props.num.marked ? '#00ffcc' : this.props.color,
                width: 80,
                height: 80,
                borderRadius: 40,
                position: 'absolute',
                top: this.props.y,
                left: this.props.x,
                zIndex: 999,
                display: 'flex',
                justifyContent: 'center',
                color: 'white'
            }}

                onClick={() => {
                    this.props.onClick()
                }}
            >
                <h1>{this.props.num.number}</h1>
            </button>
        )
    }
}