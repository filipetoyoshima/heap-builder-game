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
      initialArr: [],
      heapFlag: ':|',
      color: 'blue',
      selectedItem: null
    }
  }

  componentDidMount() {
    let array = [];
    let i = 0;
    while (i < 15) {
      let num = Math.floor(Math.random() * 100 + 1);
      if (!array.includes(num)) {
        array[i] = num;
        i++;
      } else {
        array[i] = num * 2;
        i++;
      }
    }

    array = array.map(num => {
      return { 'number': num, 'marked': false }
    })

    this.setState({ nums: array, initialArr: array.slice(0) });

  }

  isHeap(arr, i, n) {
    // If a leaf node 
    if (i > (n - 2) / 2)
      return true;

    // If an internal node and is greater than its children, and 
    // same is recursively true for the children 
    if (arr[i].number >= arr[2 * i + 1].number && arr[i].number >= arr[2 * i + 2].number &&
      this.isHeap(arr, 2 * i + 1, n) && this.isHeap(arr, 2 * i + 2, n))
      return true;

    return false;
  }

  insertInHeap = (index) => {
    let heap = this.state.heap;
    let nums = this.state.nums;
    heap.push(nums[index]);
    nums.splice(index, 1);

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
    let largest = arr[index].number;

    if (index < arr.length && arr[left].number > arr[index].number) {
      largest = left;
    }

    if (index < arr.length && arr[right].number > arr[index].number) {
      largest = right;
    }

    if (largest !== index) {
      this.heapify(largest, arr);
    }
  }

  heapup = (index, arr) => {
    let parent = this.parent(index);
    if (parent >= 0 && arr[parent] < arr[index]) {
      this.swap(parent, index, arr);
      this.heapup(parent, arr);
    }
  }


  heapAnswer = async () => {
    this.setState({ nums: this.state.initialArr, heap: [] });
    let nums = await this.state.nums;
    let heap = this.state.heap;
    for(let i = 0; i < nums.length; i++){
      console.log(i);
      this.insertInHeap(i);
      this.heapup(i,heap);
      this.setState({heap})
      await this.sleep(3000);
    }
  }


  selectItem = (index) => {
    this.setState({ color: 'blue', heapFlag: ':|' })
    let old = this.state.selectedItem;
    let newIndex = index;
    let heap = this.state.heap;
    if (old !== null) {
      if (old !== newIndex) {
        heap[newIndex].marked = true;
        this.swap(newIndex, old, heap);
        heap[newIndex].marked = false;
        heap[old].marked = false;
        this.setState({ heap, selectedItem: null });
      } else {
        heap[old].marked = false;
        this.removeFromHeap(index);
      }
    } else {
      heap[newIndex].marked = true;
      this.setState({ heap, selectedItem: newIndex });
    }

  }

  swap = (indexX, indexY, arr) => {
    let aux = arr[indexX];
    arr[indexX] = arr[indexY];
    arr[indexY] = aux;

  }

  removeFromHeap = (index) => {
    let heap = this.state.heap;
    let nums = this.state.nums;
    nums = nums.concat(heap.slice(index));
    heap.splice(index);


    this.setState({
      heap,
      nums,
      color: 'blue'
    });

  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  chooseNumber = () => {
    return (
      <div style={styles.array}>
        {this.state.nums.map((num, index) => <button onClick={() => { this.insertInHeap(index) }} style={styles.circle} key={index} > {num.number}</button>)}
      </div>
    )
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {
            this.state.nums.length ?
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <h2>Tente Inserir na heap:</h2>
                {this.chooseNumber()}
              </div>
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.heapAnswer();
            }}
            style={{ zIndex: 9999,marginRight: 0, marginTop: 50, marginBottom: 50, left: '150px', borderRadius: '50px' }}
          >
            Answer
          </Button>
        </div>

        <Tree heap={this.state.heap} selectItem={this.selectItem} color={this.state.color} />
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
