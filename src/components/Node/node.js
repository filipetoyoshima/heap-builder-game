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
            <div style={{
                background: 'blue',
                width: 80,
                height: 80,
                borderRadius: 40,
                position: 'absolute',
                top: this.props.y,
                left: this.props.x,
                zIndex: 999,
            }}
            >
{/*                 <input
                    onChange={this.handleChange}
                    style={{
                        width: 60,
                        marginLeft: 3,
                        marginTop: 29
                    }}
                /> */}
                <h1>{this.props.num}</h1>
            </div>
        )
    }
}