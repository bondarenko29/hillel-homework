import React from 'react';
import { useSelector } from 'react-redux';

const PeopleList = () => {
  const { peopleList, status, error } = useSelector((state) => state.people);

  if (status === 'loading') return <p className="text-center text-gray-400">Loading...</p>;
  if (status === 'failed') return <p className="text-center text-red-400">Error: {error}</p>;

  return (
    <div className="grid gap-6 grid-cols-1">
      {peopleList.map((people, idx) => (
        <div key={idx} className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">{people.name}</h2>
          <pre className="text-sm bg-black p-3 rounded text-white">
            {JSON.stringify(people, null, 2)}
        </pre>
          {/* <ul className="text-gray-300 space-y-1">
            <li><strong>Height:</strong> {people.height} cm</li>
            <li><strong>Mass:</strong> {people.mass} kg</li>
            <li><strong>Gender:</strong> {people.gender}</li>
            <li><strong>Birth Year:</strong> {people.birth_year}</li>
          </ul> */}
        </div>
      ))}
    </div>
  );
}

export default PeopleList;
