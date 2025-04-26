import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPeople } from '../store/features/peopleSlice';

function FetchForm() {
  const dispatch = useDispatch();
  const [id, setId] = useState('1');
  const [url, setUrl] = useState(`https://www.swapi.tech/api/people/${id}`);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    if (url.trim()) {
      dispatch(fetchPeople(url));
    }
  };

  return (
    <div className="flex w-full gap-4 mb-10">
      <input
        value={url}
        onChange={handleInputChange}
        className="flex-1 text-black pl-4 bg-gray-200 h-12 border border-gray-800 rounded-lg"
        type="text"
        placeholder="https://www.swapi.tech/api/"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg h-12"
      >
        Get Info
      </button>
    </div>
  );
}

export default FetchForm;
