import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Chuck', age: 56 },
      { name: 'Ryan', age: 23 },
      { name: 'Zach', age: 24 },
    ]
  }

  switchNameHandler = (name) => {
    // do not mutate state directly: DO NOT this.state.item = 'new item'
    // const sorted_persons = [...this.state.persons].sort((a, b) => a.age - b.age);
    this.setState({
      persons: [
        { name: name, age: 20 },
        { name: 'Ryan', age: 23 },
        { name: 'Zach', age: 24 },
      ]
    });
  }

  nameChangedHandler = (e) => {
    this.setState({
      persons: [
        { name: e.target.value, age: 20 },
        { name: 'Ryan', age: 23 },
        { name: 'Zach', age: 24 },
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={() => this.switchNameHandler('Muriel')}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={this.switchNameHandler.bind(this, 'MacGyver')} changed={this.nameChangedHandler}>My Hobbies: Board Games</Person>
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age} />
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age} />
      </div>
      // <h1>Another Heading</h1>
      // ^^ will not comple, must return a single element
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
