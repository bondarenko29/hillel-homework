import React from 'react';

const EmojiItem = ({ emojis, votes, onVote }) => {
  return (
    <div className="flex gap-4 mb-6">
      {emojis.map(emoji => (
        <div
          key={emoji.id}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onVote(emoji.id)}
        >
          <span className="text-4xl">{emoji.emoji}</span>
          <span className="text-lg mt-1">{votes[emoji.id] || 0}</span>
        </div>
      ))}
    </div>
  );
};

export default EmojiItem;
