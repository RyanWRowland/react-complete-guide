import React, { PureComponent } from 'react'
import Person from './Person/Person'

// if we need to check all props for changes before updating/rerendering
// we can just use a Pure Component 
// which does the samething as checking all props in the shouldComponentUpdate method
class Persons extends PureComponent {
  // warns if no state defined
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  // unsafe legacy method, 
  // componentWillReceiveProps(props) {
  //   console.log('[Persons.js] componentWillReceiveProps', props);
  // }

  // unsafe legacy method
  // componentWillUpdate() {
  //   console.log('[Persons.js] componentWillUpdate');
  // }

  /* Already implemented by using a Pure Component

  // prevents component from rerendering when cockpit is toggled
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Persons.js] shouldComponentUpdate');
    // optimization: only update/rerender if any props change
    return nextProps.persons !== this.props.persons ||
      nextProps.changed !== this.props.changed ||
      nextProps.clicked !== this.props.clicked;
    // IMPORTANT
    // only compares references, works because when an element changes
    // a new array is created and the state in App.js is set to the new array
    // that new array has a different reference id now.
    // if we just changed the element without creating a new array, 
    // the change would not be detected here

    // returning true would update all the time even if nothing changes
    // return true; // would normally compare props and state to determine if component should update
  }
  */

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapShotBeforeUpdate');
    return { message: 'Snapshot!' }; // snapshot value
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  componentWillUnmount() {
    console.log('[Person.js] componentWillUnmount')
  }

  render() {
    console.log('[Persons.js] rendering');
    return this.props.persons.map((person, index) => {
      return <Person
        click={() => this.props.clicked(index)}
        name={person.name}
        age={person.age}
        key={person.id}
        changed={(e) => this.props.changed(e, person.id)}>
        I am a person!
      </Person>
    });
  }
}

export default Persons
