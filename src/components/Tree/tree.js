import React from 'react';
import Node from '../Node/node';
import Button from '@material-ui/core/Button';
import { number } from 'prop-types';


export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            i: 0,
            heap: false
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
/*         console.log(values);
 */        this.setState({
            values: values
        })
    }

    updateValues(i, value) {
        var values = this.state.values;
        values[i] = value;
        this.setState({
            values: values
        })
    }

    renderNode(height = 1, x, xOrigin, limit = 4, i) {
        var node = (
            <Node
                i={i}
                y={height * 100}
                x={x / 2}
                updateValues={this.updateValues}
            />
        )

        if (height === limit) {
            return (node)
        }

        const step = xOrigin / 2 ** (height);
        const leftI = i + 1;
        const rightI = i + (2 ** (this.HEIGHT - height));

        return (
            <>
                <svg
                    width={1000}
                    height={1000}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}
                >
                    <line
                        x1={x / 2 + 40}
                        y1={height * 100 + 40}
                        x2={(x - step) / 2 + 40}
                        y2={height * 100 + 140}
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
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}
                >
                    <line
                        x1={x / 2 + 40}
                        y1={height * 100 + 40}
                        x2={(x + step) / 2 + 40}
                        y2={height * 100 + 140}
                        style={{
                            stroke: 'black',
                            strokeWidth: 3,
                            fill: 'black',
                        }}
                    />
                </svg>
                {this.renderNode(height + 1, x - step, xOrigin, limit, leftI)}
                {node}
                {this.renderNode(height + 1, x + step, xOrigin, limit, rightI)}
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

    depthOfIndex = (index, arr) => {
        if (index === 0) return 0;
        return 1 + this.depthOfIndex(Math.floor((index - 1) / 2), arr);
    }

    constantNumber = (index, arr) => {
        console.log(index, arr, "init");
        let column = this.depthOfIndex(index, arr);
        console.log(column, "col");

        let numbers = arr.filter((num, index) => {
            return this.depthOfIndex(index, arr) === column;
        });

        console.log(numbers, "num");

        let constant = 1;
        for (let i = 0, j = 1; i < numbers.length; i++ , j = j + 2) {
            console.log('i', i, arr[index], numbers[i],j);
            if (arr[index] === numbers[i]) {
                constant = j;
            }
        }
        return constant;
    }

    isHeap(arr, i, n) {
        // If a leaf node 
        if (i > (n - 2) / 2)
            return true;

        // If an internal node and is greater than its children, and 
        // same is recursively true for the children 
        if (arr[i] >= arr[2 * i + 1] && arr[i] >= arr[2 * i + 2] &&
            this.isHeap(arr, 2 * i + 1, n) && this.isHeap(arr, 2 * i + 2, n))
            return true;

        return false;
    }

    render() {
        var x = 600;
        return (
            <div>
                {/* 0 */}
                {console.log(this.constantNumber(6, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))}
                <Node
                    i={0}
                    y={1 * 100}
                    x={x}
                    num={0}
                    updateValues={this.updateValues}
                />
                {/* 1 */}
                <Node
                    i={0}
                    y={2 * 100}
                    x={x / 2}
                    num={1}
                    updateValues={this.updateValues}
                />
                {/* 2 */}
                <Node
                    i={0}
                    y={2 * 100}
                    x={x / 2 + x}
                    num={2}
                    updateValues={this.updateValues}
                />
                {/* 3 */}
                <Node
                    i={0}
                    y={3 * 100}
                    x={x / 4}
                    num={3}
                    updateValues={this.updateValues}
                />
                {/* 4 */}
                <Node
                    i={0}
                    y={3 * 100}
                    x={x / 2 + x / 4}
                    num={4}
                    updateValues={this.updateValues}
                />
                {/* 5 */}
                <Node
                    i={0}
                    y={3 * 100}
                    x={x + x / 4}
                    num={5}
                    updateValues={this.updateValues}
                />
                {/* 6 */}
                <Node
                    i={0}
                    y={3 * 100}
                    x={x + x / 2 + x / 4}
                    num={6}
                    updateValues={this.updateValues}
                />
                {/* 7 */}
                <Node
                    i={0}
                    y={4 * 100}
                    x={x / 8}
                    num={7}
                    updateValues={this.updateValues}
                />
                {/* 8 */}
                <Node
                    i={0}
                    y={4 * 100}
                    x={x / 8 + x / 4}
                    num={8}
                    updateValues={this.updateValues}
                />
                {/* 9 */}
                <Node
                    i={0}
                    y={4 * 100}
                    x={x / 8 + x / 4 + x / 4}
                    num={9}
                    updateValues={this.updateValues}
                />
                {/* 10 */}
                <Node
                    i={0}
                    y={4 * 100}
                    x={x / 8 + x / 4 + x / 4 + x / 4}
                    num={10}
                    updateValues={this.updateValues}
                />
                {/* 11 */}
                <Node
                    i={0}
                    y={4 * 100}
                    x={x / 8 + x}
                    num={11}
                    updateValues={this.updateValues}
                />
                {/* 12 */}
                <Node
                    i={0}
                    y={4 * 100}
                    x={x / 8 + x / 4 + x}
                    num={12}
                    updateValues={this.updateValues}
                />
                {/* 13 */}
                <Node
                    i={0}
                    y={4 * 100}
                    x={x / 8 + x / 4 + x / 4 + x}
                    num={13}
                    updateValues={this.updateValues}
                />
                {/* 14 */}
                <Node
                    i={0}
                    y={4 * 100}
                    x={x / 8 + x / 4 + x / 4 + x / 4 + x}
                    num={14}
                    updateValues={this.updateValues}
                />

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
            </div>
        )
    }
}