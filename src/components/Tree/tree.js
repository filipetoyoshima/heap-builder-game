import React from 'react';
import Node from '../Node/node'

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
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
                {this.renderNode(height+1, x-step, xOrigin, limit)}
                {node}
                {this.renderNode(height+1, x+step, xOrigin, limit)}
            </>
        )
    }

    render() {
        return (
            <div>
                {this.renderNode(1, 800, 800, 4)}
            </div>
        )
    }
}