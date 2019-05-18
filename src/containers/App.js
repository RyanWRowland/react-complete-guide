import React, { Component } from 'react';
import styles from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons: [
      { id: 'a1', name: 'Chuck', age: 56 },
      { id: 'b2', name: 'Ryan', age: 23 },
      { id: 'c3', name: 'Zach', age: 24 },
    ],
    showPersons: false,
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
    // let persons = null;
    // if (this.state.showPersons) {
    //   persons = (
    //     <Persons
    //       persons={this.state.persons}
    //       clicked={this.deletePersonHandler}
    //       changed={this.nameChangedHandler} />
    //   );
    // }


    return (
      <div className={styles.App}>
        <Cockpit
          length={this.state.persons.length}
          showing={this.state.showPersons}
          clicked={this.togglePersonsHandler} />
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