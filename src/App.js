import React from 'react';
import './App.css';
import Tree from '../src/components/Tree/tree';
import Button from '@material-ui/core/Button';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: [],
      heap: [],
      heapFlag: ':|',
      color: 'blue'
    }
  }

  componentDidMount() {
    let array = [];
    for (let i = 0; i < 15; i++) {
      let num = Math.floor(Math.random() * 100);
      if (!array.includes(num)) {
        array[i] = num;
      } else {
        array[i] = num * 2;
      }

    }

    this.setState({ nums: array });
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

  parent = (index) => {
    let x = Math.floor((index - 1) / 2);
    return x;
  }

  heapify = (index, arr) => {
    let right = (2 * index + 1) + 1;
    let left = (2 * index + 1);
    let largest = arr[index];

    if (index < arr.length && arr[left] > arr[index]) {
      largest = left;
    }

    if (index < arr.length && arr[right] > arr[index]) {
      largest = right;
    }

    if(largest !== index){
      this.heapify(largest,arr);
    }
  }

  removeFromHeap = (index) => {
    let heap = this.state.heap;
    let nums = this.state.nums;
    console.log(heap.slice(index));
    nums = nums.concat(heap.slice(index));
    heap.splice(index);


    this.setState({
      heap,
      nums,
      color: 'blue'
    });

  }

  chooseNumber = () => {
    return (
      <div style={styles.array}>
        {this.state.nums.map((num, index) => <button onClick={() => { this.insertInHeap(index) }} style={styles.circle} key={index} > {num}</button>)}
      </div>
    )
  }

  render() {
    return (
      <div style={styles.container}>
        {
          this.state.nums.length ?
            <>
              <h2>Tente Inserir na heap:</h2>
              {this.chooseNumber()}
            </>
            :
            <div style={{ zIndex: 9999, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  this.setState({
                    heapFlag: this.isHeap(this.state.heap, 0, this.state.heap.length) ? ':)' : ':(',
                    color: this.isHeap(this.state.heap, 0, this.state.heap.length) ? '#1aff1a' : '#ff1a1a'
                  })
                }}
                style={{ zIndex: 9999, margin: 50 }}
              >
                Check Heap!
            </Button>
              {<h1>{this.state.heapFlag}</h1>}
            </div>
        }

        <Tree heap={this.state.heap} removeFromHeap={this.removeFromHeap} color={this.state.color} />
      </div >
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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
