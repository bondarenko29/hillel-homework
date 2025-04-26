import React from 'react';
import { useDispatch } from 'react-redux';
import { clearPeople } from '../store/features/peopleSlice';

function Footer() {
  const dispatch = useDispatch();

  return (
    <footer className="mt-10 p-4 text-center">
      <button
        onClick={() => dispatch(clearPeople())}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold"
      >
        CLEAR
      </button>
    </footer>
  );
}

export default Footer;
