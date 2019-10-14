import React from 'react';
import Node from '../Node/node'

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: []
        }
    }

    componentDidMount() {
        var values = [];
        var i;
        for (i = 0; i++; i<15) {
            values.push(null);
        }
        this.setState({
            values: values
        })
    }

    renderNode(height=1, x, xOrigin, limit=4) {
        var node = (
            <Node
                y={height*100}
                x={x/2}
            />
        )

        if (height == limit) {
            return (node)
        }

        const step = xOrigin / 2**(height);

        return (
            <>
                <svg
                    width={1000}
                    height={1000}
                    style={{
                        position: 'absolute',
                        top:0,
                        left:0,
                        zIndex: 1
                    }}
                >
                    <line
                        x1={x/2 + 40}
                        y1={height*100 + 40}
                        x2={(x-step)/2 + 40}
                        y2={height*100 + 140}
                        style={{
                            stroke: 'black',
                            strokeWidth: 3,
                            fill: 'black'
                        }}
                    />
                </svg>
                <svg
                    width={1000}
                    height={1000}
                    style={{
                        position: 'absolute',
                        top:0,
                        left:0,
                        zIndex: 1
                    }}
                >
                    <line
                        x1={x/2 + 40}
                        y1={height*100 + 40}
                        x2={(x+step)/2 + 40}
                        y2={height*100 + 140}
                        style={{
                            stroke: 'black',
                            strokeWidth: 3,
                            fill: 'black',
                        }}
                    />
                </svg>
                {this.renderNode(height+1, x-step, xOrigin, limit)}
                {node}
                {this.renderNode(height+1, x+step, xOrigin, limit)}
            </>
        )
    }

    updateValue(id, value) {
        var values = this.state.values;
        values[id] = value;

        this.setState({
            values: values
        })
    }

    render() {
        return(this.renderNode(1, 800, 800, 4))
    }
}