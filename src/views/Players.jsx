import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlayerProfile from '../components/PlayerProfile';

const Players = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [playerId, setPlayerId] = useState(id || '12994'); // Default to Messi (ID 12994)
  const [playerData, setPlayerData] = useState(null);
  const [playerImage, setPlayerImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const popularPlayers = [
    { name: "Cristiano Ronaldo", id: "750" },
    { name: "Lionel Messi", id: "12994" },
    { name: "Neymar Jr", id: "124712" },
    { name: "Kylian Mbappé", id: "826643" }
  ];

  useEffect(() => {
    const targetValue = id || playerId;
    setPlayerId(targetValue);
    fetchPlayer(targetValue);
  }, [id]); // The array [id] is the dependency array. This effect runs ONLY when 'id' changes.

  const handleSearch = (e) => {
    e.preventDefault();
    if (playerId.trim()) {
      navigate(`/players/${playerId}`);
    }
  };

  const fetchPlayer = async (targetId) => {
    if (!targetId || !targetId.trim()) return;

    setLoading(true);
    setError(null);
    setPlayerImage(null);

    try {
      const url = `https://sportapi7.p.rapidapi.com/api/v1/player/${targetId}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '6e5b0b9014msh7885224e83994afp163b7bjsn710b673ee11a',
          'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Player not found or API limit reached');
      }
      const result = await response.json();
      
      if (result && result.player) {
        setPlayerData(result.player);
      } else {
        throw new Error('Player data not found');
      }

      try {
        const imgUrl = `https://sportapi7.p.rapidapi.com/api/v1/player/${targetId}/image`;
        const imgResponse = await fetch(imgUrl, options);
        if (imgResponse.ok) {
          const blob = await imgResponse.blob();
          setPlayerImage(URL.createObjectURL(blob));
        }
      } catch (imgErr) {
        console.warn('Could not load player image', imgErr);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setPlayerData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-container">
      <div className="page-header">
        <h1 className="page-title">Player Database</h1>
        <p className="page-subtitle">Search for any World Cup player using their ID (e.g. 12994 for Messi)</p>
      </div>

      <div className="search-section card">
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            className="search-input"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            placeholder="Enter Player ID..."
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}

        <div className="quick-links-section">
          <span className="quick-links-label">Popular:</span>
          <div className="quick-links-grid">
            {popularPlayers.map(p => (
              <button 
                key={p.id} 
                className="quick-link-btn"
                onClick={() => navigate(`/players/${p.id}`)}
                disabled={loading}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="player-result-section">
        {loading && <div className="loading-state">Loading player data...</div>}
        {!loading && playerData && <PlayerProfile player={playerData} imageUrl={playerImage} />}
      </div>
    </div>
  );
};

export default Players;
