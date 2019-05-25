import React, { Component } from 'react';
import styles from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    // this.state = {} // setting up state in constructor
  }

  // modern way of setting up state
  state = {
    persons: [
      { id: 'a1', name: 'Chuck', age: 56 },
      { id: 'b2', name: 'Ryan', age: 23 },
      { id: 'c3', name: 'Zach', age: 24 },
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  };

  // if just initializing state from props, just set in constructor
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // // rarely used, mostly likely removed in the future
  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    // return false; // prevent component from updating
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  nameChangedHandler = (e, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    const person = { ...this.state.persons[personIndex] };
    person.name = e.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // optional setState syntax, prefered way to update based on old state
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {
    console.log('[App.js] rendering')
    return (
      <Aux>
        <button onClick={() => this.setState({ showCockpit: !this.state.showCockpit })}>Toggle Cockpit</button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}
        >
          {this.state.showCockpit ?
            <Cockpit
              title={this.props.appTitle}
              // persons={this.state.persons} // pass persons to cockpit for useEffect hook
              length={this.state.persons.length}
              showing={this.state.showPersons}
              clicked={this.togglePersonsHandler} /> : null}
          {this.state.showPersons ? // if showing persons, render persons
            <Persons
              persons={this.state.persons}
              clicked={this.deletePersonHandler}
              changed={this.nameChangedHandler} /> : null}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, styles.App);

// React DOM rendering notes
/*
React uses virtual DOMs to keep track of changes and
only updates the real DOM when it detects changes and
even then is only rendering components or areas that have changed.

To me, this means that while preventing a component
from updating or rerendering when it doesn't have to
with shouldComponentUpdate and other methods can be an optimization,
React, under the hood, already isn't rerendering components that haven't
been changed.
*/