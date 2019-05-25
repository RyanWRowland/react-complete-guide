import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import styles from './Person.module.css';

// Aux here is basically the same as React.Fragment
/*
  return (
      <React.Fragment>
        <p key="name/age" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>,
        <p key="children" className="red bold">{this.props.children}</p>,
        <input key="nameInput" type="text" onChange={this.props.changed} value={this.props.name} />
      </React.Fragment>
    );
*/

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
  // optimization: should only update/rerender component if the name has changed
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.name !== this.props.name || nextProps.isAuthed !== this.props.isAuthed;
  }

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
  }


  render() {
    console.log('[Person.js] rendering', this.props.name);
    console.log(this.props.isAuthed);
    // if we don't need/want a wrapping element returned
    // we can wrap our elements in a very simple higher order component
    return (
      <Aux>
        <p>{this.props.isAuthed ? "Authenticated" : "Please log in"}</p>
        <p key="name/age" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
        <p key="children" className="red bold">{this.props.children}</p>
        <input
          key="nameInput"
          ref={this.inputElementRef}
          // ref={(e) => this.inputElement = e}
          type="text"
          onChange={this.props.changed}
          value={this.props.name} />
      </Aux>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  changed: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  isAuthed: PropTypes.bool,
};

export default withClass(Person, styles.Person);
