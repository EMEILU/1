import React, { useState, useEffect } from 'react';
import './App.css';

const VotingApp = () => {
  const defaultCandidates = [
    { name: 'Candidate A', votes: 0 },
    { name: 'Candidate B', votes: 0 },
    { name: 'Candidate C', votes: 0 },
  ];

  const [candidates, setCandidates] = useState(defaultCandidates);

  useEffect(() => {
    const savedData = localStorage.getItem('votingData');
    if (savedData) {
      setCandidates(JSON.parse(savedData));
    }
  }, []);

  const handleVote = (index) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index].votes += 1;
    setCandidates(updatedCandidates);
    localStorage.setItem('votingData', JSON.stringify(updatedCandidates));
  };

  const handleReset = () => {
    const resetCandidates = candidates.map(candidate => ({ ...candidate, votes: 0 }));
    setCandidates(resetCandidates);
    localStorage.setItem('votingData', JSON.stringify(resetCandidates));
  };

  const maxVotes = Math.max(...candidates.map(candidate => candidate.votes));

  return (
    <div className="voting-app">
      <h1 className="heading">Voting Application</h1>
      <button className="reset-button" onClick={handleReset}>
        Reset Votes
      </button>
      <div className="candidate-list">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className={`candidate-card ${candidate.votes === maxVotes && candidate.votes > 0 ? 'leading' : ''}`}
          >
            <span className="candidate-name">{candidate.name}</span>
            <span className="candidate-votes">Votes: {candidate.votes}</span>
            <button className="vote-button" onClick={() => handleVote(index)}>
              Vote
            </button>
          </div>
        ))}
      </div>
      {maxVotes > 0 && (
        <h2 className="leader-text">
          Leading Candidate: {candidates.find(candidate => candidate.votes === maxVotes)?.name}
        </h2>
      )}
    </div>
  );
};

export default VotingApp;