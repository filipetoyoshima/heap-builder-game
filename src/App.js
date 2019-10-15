import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tree from '../src/components/Tree/tree';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: []
    }
  }

  componentDidMount() {
    let array = [];
    for (let i = 0; i < 15; i++) {
      array[i] = Math.floor(Math.random() * 100);
    }

    this.setState({ nums: array });
  }

  render() {
    return (
      <div style={styles.container}>
        <h2>Tente Inserir na heap:</h2>
        <div style={styles.array}>
          {this.state.nums.map((num, index) => index !== 14 ? <h2 key={index}> {num}, </h2> : <h2 key={index} > {num}</h2>)}
        </div>
        <Tree />
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
  }
}

export default App;
