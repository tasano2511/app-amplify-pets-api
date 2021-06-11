
//import logo from './logo.svg';
import Amplify, { API } from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import './App.css';
import React, { useEffect } from 'react';

Amplify.configure(config);

function App() {
  const [petName, setPetName] = React.useState('')
  const [petType, setPetType] = React.useState('')
  const [pets, setPets] = React.useState([])

  useEffect (() => {
    API.get("petsapi", "/pets/name").then ((petRes) => {
      setPets([...pets, ...petRes])
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault()

    API.post('petsapi', '/pets', {
      body: {
        name: petName,
        type: petType
      },
    }).then(() => {
      setPets([{name: petName, type: petType}, ...pets])
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        Hello
        <form onSubmit={handleSubmit}> 
          <input value={petName} placeholder="fiddo" onChange={(e)=>setPetName(e.target.value)} />
          <input value={petType} placeholder="fiddo" onChange={(e)=>setPetType(e.target.value)} />
          <button>Add Pet</button>
        </form>
        <ul>
          {pets.map(pet => (
            <li>{pet.name}</li>
          ))}
        </ul>
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
