import React, { Component } from 'react';
import styles from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

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

    this.setState({ persons: persons });
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

  render() {
    console.log('[App.js] rendering')
    return (
      <div className={styles.App}>
        <button onClick={() => this.setState({ showCockpit: !this.state.showCockpit })}>Toggle Cockpit</button>
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
      </div>
    );
  }
}

export default App;