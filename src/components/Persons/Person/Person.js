import React, { Component } from 'react';
import styles from './Person.module.css';

class Person extends Component {
  // optimization: should only update/rerender component if the name has changed
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.name !== this.props.name
  }

  render() {
    console.log('[Person.js] rendering', this.props.name);
    return (
      <div className={styles.Person}>
        <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
        <p className="red bold">{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
      </div>
    )
  }
}

export default Person;
