import React, { useState, useEffect } from 'react';
import Results  from './components/Results';
import './index.css'; 

const emojis = [
    { emoji: '😀', id: 'grinning' },
    { emoji: '😊', id: 'smiling' },
    { emoji: '😎', id: 'sunglasses' },
    { emoji: '🤩', id: 'star-struck' },
    { emoji: '😍', id: 'heart-eyes' },
    { emoji: '🥳', id: 'birthday' },
];

function App() {
    const [votes, setVotes] = useState(() => {
        const storedVotes = localStorage.getItem('emojiVotes');
        return storedVotes ? JSON.parse(storedVotes) : {};
    });
    const [showResults, setShowResults] = useState(false);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        localStorage.setItem('emojiVotes', JSON.stringify(votes));
    }, [votes]);

    const handleVote = (emojiId) => {
        setVotes(prevVotes => ({
            ...prevVotes,
            [emojiId]: (prevVotes[emojiId] || 0) + 1,
        }));
    };

    const handleShowResults = () => {
        let currentWinner = null;
        let maxVotes = -1;

        for (const emojiId in votes) {
            if (votes[emojiId] > maxVotes) {
                maxVotes = votes[emojiId];
                currentWinner = emojis.find(e => e.id === emojiId);
            }
        }

        setWinner(currentWinner);
        setShowResults(true);
    };

    const handleClearResults = () => {
        if (window.confirm('Ви впевнені, що хочете очистити результати голосування?')) {
            localStorage.removeItem('emojiVotes');
            setVotes({});
            setShowResults(false);
            setWinner(null);
        }
    };

    return (
      <div className="flex justify-center items-center">
        <div className='container max-w-1/2 p-4 rounded overflow-hidden shadow-lg'>
          <div className="flex flex-col center items-center p-6">
            <h1 className="text-2xl font-bold mb-4">Голосування за найкращий смайлик</h1>
            <div className="flex gap-4 mb-6">
                {emojis.map(emoji => (
                    <div
                        key={emoji.id}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => handleVote(emoji.id)}
                    >
                        <span className="text-4xl">{emoji.emoji}</span>
                        <span className="text-lg mt-1">{votes[emoji.id] || 0}</span>
                    </div>
                ))}
            </div>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleShowResults}
            >
                Показати результати
            </button>

            <Results showResults={showResults} winner={winner} votes={votes} />

            <button
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleClearResults}
            >
                Очистити результати
            </button>
        </div>
      </div>
      </div>
      
  );
}

export default App;









