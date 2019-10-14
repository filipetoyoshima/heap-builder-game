import React from 'react';
import Node from '../Node/node'

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            i: 0
        }
        this.HEIGHT = 4;
        this.updateValues = this.updateValues.bind(this);
        this.renderNode = this.renderNode.bind(this);
    }

    createArray(len, itm) {
        var arr1 = [itm],
            arr2 = [];
        while (len > 0) {
            if (len & 1) arr2 = arr2.concat(arr1);
            arr1 = arr1.concat(arr1);
            len >>>= 1;
            // geez... this is sorcery from StackOverflow
            // don't blame on me
        }
        return arr2;
    }

    componentDidMount() {
        var values = this.createArray(15, null);
        console.log(values);
        this.setState({
            values: values
        })
    }

    updateValues(i, value) {
        var values = this.state.values;
        values[i] = value;
        this.setState({
            values: values
        })
        console.log(values);
    }

    renderNode(height=1, x, xOrigin, limit=4, i) {
        var node = (
            <Node
                i={i}
                y={height*100}
                x={x/2}
                updateValues={this.updateValues}
            />
        )

        if (height === limit) {
            return (node)
        }

        const step = xOrigin / 2**(height);
        const leftI = i+1;
        const rightI = i+(2**(this.HEIGHT-height));

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
                {this.renderNode(height+1, x-step, xOrigin, limit, leftI)}
                {node}
                {this.renderNode(height+1, x+step, xOrigin, limit, rightI)}
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
        return(this.renderNode(1, 800, 800, this.HEIGHT, 0))
    }
}