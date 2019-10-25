import React from 'react';
import Node from '../Node/node';


export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heap: false
        }
    }

    depthOfIndex = (index, arr) => {
        return index === 0 ? 0 : 1 + this.depthOfIndex(Math.floor((index - 1) / 2), arr);
    }

    constantNumber = (index, arr) => {
        let column = this.depthOfIndex(index, arr);
        let numbers = arr.filter((num, index) => {
            return this.depthOfIndex(index, arr) === column;
        });

        let constant = 1;
        for (let i = 0, j = 1; i < numbers.length; i++ , j = j + 2) {
            if (arr[index] === numbers[i]) {
                constant = j;
            }
        }
        return constant;
    }

    nodePosition = (index, arr) => {
        let x = 650;
        let y = this.constantNumber(index, arr);
        let z = 2 ** this.depthOfIndex(index, arr);
        return (x * y) / z;
    }

    render() {
        const { heap } = this.props;
        return (
            <div>
                {
                    heap.map((num, index) => {
                        return (
                            <>
                                <Node
                                    onClick={() => { this.props.removeFromHeap(index) }}
                                    key={index}
                                    i={index}
                                    y={(this.depthOfIndex(index, heap) + 1.5) * 100}
                                    x={this.nodePosition(index, heap)}
                                    num={num}
                                    color={this.props.color}                                    
                                />
                                {
                                    index >= 1 ?
                                        < svg
                                            width={2000}
                                            height={2000}
                                            style={{
                                                position: 'absolute',
                                                top: 50,
                                                left: 50,
                                                zIndex: 1
                                            }}
                                        >
                                            <line
                                                x1={this.nodePosition(Math.floor((index - 1) / 2), heap)}
                                                y1={(this.depthOfIndex(Math.floor((index - 1) / 2), heap) + 1.5) * 100}
                                                x2={this.nodePosition(index, heap)}
                                                y2={(this.depthOfIndex(index, heap) + 1.5) * 100}
                                                style={{
                                                    stroke: 'black',
                                                    strokeWidth: 3,
                                                    fill: 'black',
                                                }}
                                            />
                                        </svg>
                                        : null
                                }
                            </>
                        )
                    })
                }

                {/*                 {this.renderNode(1, 800, 800, this.HEIGHT, 0)}
                <div style={{ zIndex: 9999 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => { this.setState({ heap: this.isHeap(this.state.values, 0, this.state.values.length) }) }}
                        style={{ zIndex: 9999 }}
                    >
                        Check Heap!
                    </Button>
                    {this.state.heap ? <h1> Heap </h1> : <h1>No</h1>}
                </div> */}
            </div >
        )
    }
}