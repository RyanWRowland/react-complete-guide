import React, { useEffect } from 'react'
import styles from './Cockpit.module.css'

const Cockpit = (props) => {
  // executes every render cycle
  useEffect(() => { // combines componentDidMount and componentDidUpdate
    console.log('[Cockpit.js] useEffect');
    // can send http request here
    const timer = setTimeout(() => {
      // alert('Saved data to cloud!');
      console.warn('Saved data to cloud!');
    }, 1000);

    return () => { // return function to be run on unmount
      clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, []); // empty array causes to only run on mount
  // }, [props.persons]); // data to watch for changes

  // can have multiple useEffects
  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    }
  });

  console.log('[Cockpit.js] rendering');
  let classes = [];
  if (props.length <= 2) {
    classes.push('red');
  }
  if (props.length <= 1) {
    classes.push('bold');
  }

  return (
    <div className={styles.Cockpit}>
      <h1>{props.title}</h1>
      <p className={classes.join(' ')}>This is really working!</p>
      <button
        className={props.showing ? styles.Red : ''}
        onClick={props.clicked}>Toggle Persons</button>
    </div>
  )
}

export default React.memo(Cockpit);
// React.memo optimizes functional components
// only updates the functional component if its props change
