import React from "react";
import beruImage from './assets/beruWhitesun.jpeg'
import biggsImage from './assets/biggsDarklighter.jpg'
import lukeImage from './assets/luke.jpg'
import owenImage from './assets/owenLars.jpeg'
import './App.css'

const person = [
  {
    "name": "Beru Whitesun lars", 
    "height": "165", 
    "mass": "75", 
    "hair_color": "brown", 
    "skin_color": "light", 
    "eye_color": "blue", 
    "birth_year": "47BBY", 
    "gender": "female", 
    "image": beruImage,         
  },
  {
    "name": "Owen Lars",
    "height": "178",
    "mass": "120",
    "hair_color": "brown, grey",
    "skin_color": "light",
    "eye_color": "blue",
    "birth_year": "52BBY",
    "gender": "male",
    "image": owenImage,
  },
  {
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "birth_year": "19BBY",
    "gender": "male",
    "image": lukeImage,
  },
  {
    "name": "Biggs Darklighter",
    "height": "183",
    "mass": "84",
    "hair_color": "black",
    "skin_color": "light",
    "eye_color": "brown",
    "birth_year": "24BBY",
    "gender": "male",
    "image": biggsImage,
  },  
];

const PersonCard = ({ person })  => {
  return (
      <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
          <div className="grid grid-cols-1 gap-2">
              <p><span className="font-bold">Height:</span> {person.height}</p>
              <p><span className="font-bold">Mass:</span> {person.mass}</p>
              <p><span className="font-bold">Hair Color:</span> {person.hair_color}</p>
              <p><span className="font-bold">Skin Color:</span> {person.skin_color}</p>
              <p><span className="font-bold">Eye Color:</span> {person.eye_color}</p>
              <p><span className="font-bold">Birth Year:</span> {person.birth_year}</p>
              <p><span className="font-bold">Gender:</span> {person.gender}</p>
          </div>
          {person.image && <div className="mt-4"><img src={person.image} alt={person.name} className="h-auth-96 w-96 object-contain" /></div>}
      </div>
  );
}


function App() {
  return (

    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">SWAPI People</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {person.map((person, index) => (
                <PersonCard key={index} person={person} />
                  ))}
        </div>
      </div>
  )
}

export default App
