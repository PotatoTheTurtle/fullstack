import React, { useState } from 'react'
import ReactDOM from "react-dom";

const Renderpersons = ({persons, filter}) =>{
  return(persons.map(person => {
    if(person.name.includes(filter)){
      return(<p>{person.name + " " + person.number}</p>)
    }
  }));
};

const Searchfilter = ({handle, value}) =>{
  return(
  <form>
    <div>
      filter shown with<input onChange={handle} value={value}/>
    </div>
  </form>);
};

const Addpeople = ({onsubmit, onNameChange, onNumberChange, namevalue, numbervalue}) =>{
  return(
  <form onSubmit={onsubmit}>
    <div>
      name: <input onChange={onNameChange} value={namevalue}/>
    </div>
    <div>number: <input onChange={onNumberChange} value={numbervalue}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>);
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

    const [ newName, setNewName ] = useState('');
    const [newNumber,setNewNumber] = useState('');
    const [filter,setFilter] = useState('');

    const addPerson = (event) =>{
      event.preventDefault();
      if(newNumber.length === 0 || newName.length === 0){
        alert("Both inputs have to be filled in");
        setNewNumber('');
        setNewName('');
      }
      if(persons.some(e => e.name === newName)){
          alert(newName + " is in the phonebook");
          setNewName('');
          return
      }

      if(persons.some(e => e.number === newNumber)){
        alert(newNumber + " is in the phonebook");
        setNewNumber('');
        return
      }
        setPersons(persons.concat({name: newName, number: newNumber}));
        setNewName('');
        setNewNumber('');
    };

    const handlePersonChange = (event) =>{
        setNewName(event.target.value)
    };

    const handleNumberChange = (event) =>{
      setNewNumber(event.target.value)
    };

    const handleFilterChange = (event) =>{
      setFilter(event.target.value)
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Searchfilter handle={handleFilterChange} value={filter}/>
            <h2>Add a new</h2>
            <Addpeople onsubmit={addPerson} onNameChange={handlePersonChange} onNumberChange={handleNumberChange} namevalue={newName} numbervalue={newNumber}/>
            <h2>Numbers</h2>
            <Renderpersons persons={persons} filter={filter}/>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));