import React from 'react';
import Node from '../Node/node';


export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heap: false,
            selectedItem: ''
        }
    }

    depthOfIndex = (index, arr) => {
        let results = {0:0,1:1,2:1,3:2,4:2,5:2,6:2,7:3,8:3,9:3,10:3,11:3,12:3,13:3,14:3,15:3}
        return results[index];
        /* return index === 0 ? 0 : 1 + this.depthOfIndex(Math.floor((index - 1) / 2), arr); */
    }

    constantNumber = (index, arr) => {
        let column = this.depthOfIndex(index, arr);
        let numbers = arr.filter((num, index) => {
            return this.depthOfIndex(index, arr) === column;
        });
        console.log(numbers, 'num');
        let constant = 1;
        for (let i = 0, j = 1; i < numbers.length; i++ , j = j + 2) {
            if (arr[index].number === numbers[i].number) {
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
                                    onClick={() => { this.props.selectItem(index) }}
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

            </div >
        )
    }
}