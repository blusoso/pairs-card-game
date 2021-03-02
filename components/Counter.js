import React, { Component } from 'react'

class Counter extends Component {
  state = { counter: 0 }

  render() {
    return (
      <div>
        <button id='btn-test-add' onClick={() => {
          this.setState(prev => ({ counter: prev.counter + 1 }))
        }}>
          +
        </button>
          {this.state.counter}
        <button id='btn-test-sub' onClick={() => {
          this.setState(prev => ({ counter: prev.counter - 1 }))
        }}>
          -
        </button>
      </div>
    );
  }
}

export default Counter