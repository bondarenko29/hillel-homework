import React from 'react';
import FetchForm from './components/FetchForm';
import PeopleList from './components/PeopleList';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-extrabold text-yellow-400 mb-10 text-center">SWAPI</h1>
      <FetchForm />
      <PeopleList />
      <Footer />
    </div>
  );
}

export default App;