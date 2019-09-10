import React, { Component } from 'react';
import classes from '../containers/App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';


class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    this.state = {
      persons: [
        { id: '1', name: "Max", age: "29" },
        { id: '2', name: "Manu", age: "28" },
        { id: '3', name: "Stephanie", age: "26" }
      ],
      otherState: "some other value",
      showPersons: false,
      showCockpit: true,
    }
  }
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  switchNameHandler = (newName) => {
    // console.log('Clicked!!!');
    this.setState({
      persons: [
        { name: newName, age: "29" },
        { name: "Manu", age: "28" },
        { name: "Stephanie", age: "27" }
      ],
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow,
    })
  }

  deletePersonsHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  render() {
    console.log('[App.js] render');
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonsHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <div className={classes.App} >
        <button
          onClick={() => {
            this.setState({ showCockpit: false })
          }}
        >
          Show Cockpit</button>
        {this.state.showCockpit ?
          <Cockpit
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
            title={this.props.appTitle}
          /> : null}
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work!!!'));
  }
}

export default App;

  // React Hooks useState;
  //import React, { useState } from 'react';
  //const app = props => {
  //   const [personsState, setPersonsState] = useState({
  //     persons: [
  //       { name: "Max", age: "29" },
  //       { name: "Manu", age: "28" },
  //       { name: "Stephanie", age: "26" }
  //     ],
  //   });

  //   const switchNameHandler = () => {
  //     setPersonsState({
  //       persons: [
  //         { name: "Maximilian", age: "29" },
  //         { name: "Manu", age: "28" },
  //         { name: "Stephanie", age: "27" }
  //       ],
  //     })
  //   }

  //   const [otherState] = useState('some other value');

  //   return (
  //     <div className="App">
  //       <h1>Hi, i am React App</h1>
  //       <button onClick={switchNameHandler}>Switch Name</button>
  //       <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
  //       <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobies: Racing</Person>
  //       <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
  //     </div>
  //   );
  //   // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work!!!'));
  // }

  // export default app;
