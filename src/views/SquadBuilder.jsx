import React, { useState, useEffect } from 'react';

const SquadBuilder = () => {
  const [budget, setBudget] = useState(0);
  const [players, setPlayers] = useState([]);
  const [selectedSquad, setSelectedSquad] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

  useEffect(() => {
    const randomBudget = Math.floor(Math.random() * (1300 - 900 + 1)) + 900;
    setBudget(randomBudget);
    fetchPlayers();
  }, []);

  useEffect(() => {
    const spent = selectedSquad.reduce((acc, player) => acc + player.price, 0);
    setTotalSpent(spent);

    if (spent > budget && budget > 0) {
      setGameStatus('lost');
    } else if (selectedSquad.length === 11 && spent <= budget) {
      setGameStatus('won');
    } else {
      setGameStatus('playing');
    }
  }, [selectedSquad, budget]);

  const fetchPlayers = async () => {

    const mockData = [

      { id: 1, name: "Kylian Mbappé", image: "/player-avatar.png", price: 180 },
      { id: 2, name: "Erling Haaland", image: "/player-avatar.png", price: 170 },
      { id: 3, name: "Lionel Messi", image: "/player-avatar.png", price: 150 },
      { id: 4, name: "Vinícius Júnior", image: "/player-avatar.png", price: 140 },
      { id: 5, name: "Jude Bellingham", image: "/player-avatar.png", price: 140 },
      { id: 6, name: "Kevin De Bruyne", image: "/player-avatar.png", price: 130 },

      { id: 7, name: "Harry Kane", image: "/player-avatar.png", price: 120 },
      { id: 8, name: "Bukayo Saka", image: "/player-avatar.png", price: 110 },
      { id: 9, name: "Rodri", image: "/player-avatar.png", price: 100 },
      { id: 10, name: "Declan Rice", image: "/player-avatar.png", price: 95 },
      { id: 11, name: "Virgil van Dijk", image: "/player-avatar.png", price: 90 },
      { id: 12, name: "Ruben Dias", image: "/player-avatar.png", price: 85 },
      { id: 13, name: "Trent A-Arnold", image: "/player-avatar.png", price: 80 },
      { id: 14, name: "William Saliba", image: "/player-avatar.png", price: 75 },

      { id: 15, name: "Alisson Becker", image: "/player-avatar.png", price: 70 },
      { id: 16, name: "Julian Alvarez", image: "/player-avatar.png", price: 70 },
      { id: 17, name: "Ederson", image: "/player-avatar.png", price: 65 },
      { id: 18, name: "Lisandro Martinez", image: "/player-avatar.png", price: 60 },
      { id: 19, name: "Alejandro Garnacho", image: "/player-avatar.png", price: 55 },
      { id: 20, name: "Emiliano Martinez", image: "/player-avatar.png", price: 50 },
      { id: 21, name: "Pau Cubarsi", image: "/player-avatar.png", price: 45 },
      { id: 22, name: "Kobbie Mainoo", image: "/player-avatar.png", price: 40 },
      { id: 23, name: "Guglielmo Vicario", image: "/player-avatar.png", price: 40 }
    ];
    setPlayers(mockData);
  };

  const handleSelectPlayer = (player) => {
    if (gameStatus === 'lost' || gameStatus === 'won') return;
    if (selectedSquad.length >= 11) return;
    if (selectedSquad.find(p => p.id === player.id)) return; // Prevent duplicates
    
    setSelectedSquad([...selectedSquad, player]);
  };

  const resetGame = () => {
    const randomBudget = Math.floor(Math.random() * (1300 - 900 + 1)) + 900;
    setBudget(randomBudget);
    setSelectedSquad([]);
    setGameStatus('playing');
  };

  return (
    <div className="squad-builder-container">
      {}
      <div className="sb-header">
        <h1 className="sb-title">Budget Squad Builder</h1>
        <div className="sb-tracker-panel">
          <div className="sb-stat">
            <span className="sb-label">Total Budget</span>
            <span className="sb-value">${budget}M</span>
          </div>
          <div className={`sb-stat ${gameStatus === 'lost' ? 'text-red' : ''}`}>
            <span className="sb-label">Total Spent</span>
            <span className="sb-value">${totalSpent}M</span>
          </div>
          <div className="sb-stat">
            <span className="sb-label">Players</span>
            <span className="sb-value">{selectedSquad.length} / 11</span>
          </div>
        </div>
      </div>

      {}
      {gameStatus === 'lost' && (
        <div className="sb-status-banner sb-busted">
          <h2>Busted! You exceeded the budget.</h2>
          <button onClick={resetGame} className="sb-reset-btn">Try Again</button>
        </div>
      )}
      
      {gameStatus === 'won' && (
        <div className="sb-status-banner sb-won">
          <h2>Challenge Completed! You Win!</h2>
          <button onClick={resetGame} className="sb-reset-btn">Play Again</button>
        </div>
      )}

      {}
      <div className="sb-layout">
        
        {}
        <div className="sb-available-players">
          <h2 className="sb-section-title">Available Players</h2>
          <div className="sb-grid">
            {players.map(player => {
              const isSelected = selectedSquad.find(p => p.id === player.id);
              return (
                <div 
                  key={player.id} 
                  className={`sb-player-card ${isSelected ? 'sb-selected-card' : ''} ${gameStatus !== 'playing' ? 'sb-disabled-card' : ''}`}
                  onClick={() => handleSelectPlayer(player)}
                >
                  <img src={player.image} alt={player.name} className="sb-player-img" />
                  <div className="sb-player-info">
                    <span className="sb-name">{player.name}</span>
                    <span className="sb-price">${player.price}M</span>
                  </div>
                  {isSelected && <div className="sb-selected-overlay">Selected</div>}
                </div>
              );
            })}
          </div>
        </div>

        {}
        <div className="sb-squad-sidebar">
          <h2 className="sb-section-title">Your Squad</h2>
          <div className="sb-squad-list">
            {selectedSquad.length === 0 ? (
              <p className="sb-empty-state">No players selected yet.</p>
            ) : (
              selectedSquad.map((p, index) => (
                <div key={p.id} className="sb-squad-item">
                  <span className="sb-item-num">{index + 1}</span>
                  <span className="sb-item-name">{p.name}</span>
                  <span className="sb-item-price">${p.price}M</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SquadBuilder;
