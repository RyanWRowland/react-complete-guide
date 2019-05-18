import React from 'react'
import styles from './Cockpit.module.css'

const Cockpit = (props) => {
  let classes = [];
  if (props.length <= 2) {
    classes.push('red');
  }
  if (props.length <= 1) {
    classes.push('bold');
  }

  return (
    <div className={styles.Cockpit}>
      <h1>Hi, I'm a React App</h1>
      <p className={classes.join(' ')}>This is really working!</p>
      <button
        className={props.showing ? styles.Red : ''}
        onClick={props.clicked}>Toggle Persons</button>
    </div>
  )
}

export default Cockpit
