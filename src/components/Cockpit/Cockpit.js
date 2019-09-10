import React, { useEffect } from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
  useEffect(() => {
    console.log('[Cockpit.js] UseEffect!');
    setTimeout(() => {
      alert('Data is awesome!')
    }, 1000);
    return () => { console.log('[Cockpit.js] cleanup work in useEffect!') }
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] 2nd UseEffect!');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect!');
    };
  })

  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);// classes = ['red];
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);// classes = ['bold'];
  }
  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button
        className={btnClass}
        onClick={props.clicked}
      >Switch Name</button>
    </div>
  );
}

export default React.memo(cockpit);