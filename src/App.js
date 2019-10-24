import React from 'react';
import './App.css';
import Tree from '../src/components/Tree/tree';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: [],
      heap: []
    }
  }

  componentDidMount() {
    let array = [];
    for (let i = 0; i < 15; i++) {
      array[i] = Math.floor(Math.random() * 100);
    }

    this.setState({ nums: array });
  }

  insertInHeap = (index) => {
    let heap = this.state.heap;
    let nums = this.state.nums;
    heap.push(nums[index]);
    nums.splice(index, 1);
    console.log(heap, nums);

    this.setState({
      heap,
      nums
    });

  }

  removeFromHeap = (index) => {
    let heap = this.state.heap;
    let nums = this.state.nums;
    console.log(heap.slice(index));
    nums = nums.concat(heap.slice(index));
    heap.splice(index);


    this.setState({
      heap,
      nums
    });

  }

  render() {
    return (
      <div style={styles.container}>
        <h2>Tente Inserir na heap:</h2>
        <div style={styles.array}>
          {this.state.nums.map((num, index) => <button onClick={() => { this.insertInHeap(index) }} style={styles.circle} key={index} > {num}</button>)}
        </div>
        <Tree heap={this.state.heap} removeFromHeap={this.removeFromHeap} />
      </div >
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  array: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '-25px'
  },
  circle: {
    background: 'blue',
    width: 40,
    height: 40,
    borderRadius: 40,
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    margin: 10
  }
}

export default App;
