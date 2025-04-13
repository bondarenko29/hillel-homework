import React from 'react';

const Results =({ showResults, winner, votes }) => {
    if (!showResults || !winner) {
        return null;
    }

    return (
        <div className="mt-6 p-4 border border-gray-300 rounded shadow-sm text-center">
            <h2 className="text-xl font-semibold mb-2">Результати голосування:</h2>
            <p className="mb-1">Переможець:</p>
            <div className="flex justify-center">
                <span className="text-5xl">{winner.emoji}</span>
            </div>
            <p>
                Кількість голосів: <span className="font-bold">{votes[winner.id]}</span>
            </p>
        </div>
    )

}
export default Results;

