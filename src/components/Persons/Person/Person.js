import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
// import styles from './Person.module.css';

class Person extends Component {
  // optimization: should only update/rerender component if the name has changed
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.name !== this.props.name
  }

  render() {
    console.log('[Person.js] rendering', this.props.name);
    // if we don't need/want a wrapping element returned
    // we can wrap our elements in a very simple higher order component
    return (
      <Aux>
        <p key="name/age" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>,
      <p key="children" className="red bold">{this.props.children}</p>,
      <input key="nameInput" type="text" onChange={this.props.changed} value={this.props.name} />
      </Aux>
    );
  }
}

export default Person;
