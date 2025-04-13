import React, { useState, useEffect } from 'react';
import Results from './Results';
import EmojiItem from './EmojiItem';
import Button from './Button';

const emojis = [
    { emoji: '😀', id: 'grinning' },
    { emoji: '😊', id: 'smiling' },
    { emoji: '😎', id: 'sunglasses' },
    { emoji: '🤩', id: 'star-struck' },
    { emoji: '😍', id: 'heart-eyes' },
    { emoji: '🥳', id: 'birthday' },
];

function EmojiCounterList() {
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
            <EmojiItem emojis={emojis} votes={votes} onVote={handleVote} />
            <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleShowResults}
            >
                Показати результати
            </Button>

            <Results showResults={showResults} winner={winner} votes={votes} />

            <Button
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleClearResults}
            >
                Очистити результати
            </Button>
        </div>
      </div>
      </div>
      
  );
}

export default EmojiCounterList;